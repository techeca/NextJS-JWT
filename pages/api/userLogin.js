import { conn } from '../../config/db';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await loadUserInfo(req, res);
    case 'POST':
      return await userLogin(req, res);
    default:
      return res.status(400).send('Method not allowed');
  }

}

function generateToken(data) {
  var u = {
    name: data.name,
    lastName: data.lastName,
    rut: data.rut,
    phone: data.phone,
    email: data.email,
    password: data.password
  }
  const token = jwt.sign(u, '4626c7660cb17cca76b21bc5a52f8de133be0f7d44cc2596f6601812d1010edacf920d0e2a90b75222e4f8e6db9b1710c885d97312f229f97189de2720fce442', {
    expiresIn: 60 * 60 * 24,  //Cuanto tiempo es?? 3min?
  });
  return token;
}

function validateToken(data) {
  const token = jwt.verify(data, '4626c7660cb17cca76b21bc5a52f8de133be0f7d44cc2596f6601812d1010edacf920d0e2a90b75222e4f8e6db9b1710c885d97312f229f97189de2720fce442', (err, token) => {
    if(err) return false;
    return true;
  });
}

function parseToken(token) {
  if(!token){return;}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const userLogin = async (req, res) => {
  const authHeader = req.headers['authorization'];
  //console.log(authHeader);
  if(authHeader){
    //Usuario quiere deslogear
    console.log('Intentamos deslogear')
    jwt.sign(authHeader, '', {expiresIn:1},(logout, err) => {
      if(logout) {
        console.log('desconectamos')
        return res.status(200).json({ message:'Desconectado', code:200});
      }else {
        console.log('error al desconectar')
        res.status(500).json({message:'Error', code:500})
      }
    });
  }else {
    console.log('Intentamos logear')
    try {
      //Obtiene los datos de formulario
      const {email, password} = req.body;
      //Se encripta la contraseña con bcrypt
      var hash = await bcrypt.hash(password, 10);
      //Query para buscar email en BD
      let results = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
      if(parsedata.length>0){
          //Guardamos hash de BD
          const storedPass = parsedata[0]['hash'];
          //Validamos que password es igual a hash de BD
          const match = await bcrypt.compare(password, storedPass);
          //console.log(storedPass);
          if(match){
              //Inicia sesion, se genera token, guarda token y se redirige a panel de usuario?
              //Enviamos token con los datos del usuario
              //res.cookie('token', generateToken(parsedata[0]), {maxAge: 300 * 1000});
              return res.status(200).json({ message:'Validando datos...', code:200, data: generateToken(parsedata[0])});
            }else {
              //Pasword y hash distintos
              return res.status(500).json({ message:'Contraseña incorrecta', code:500});
            }
      }else {
        //Correo no se encuentra en BD
        return res.status(500).json({ message: 'Correo no está registrado', code:500});
      }
    } catch (error) {
      //Cualquier otro error
        return res.status(500).json({ message: ' '+error, code:500});
    }
  }
};

const loadUserInfo = async (req, res) => {
  try {
    //console.log('intentando autorizar')
    //Verificar inicio de sesion
    const authHeader = req.headers['authorization'];
    //Obtenemos token
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token);
    if(token == null) return res.status(500).json({ message: 'Inicia sesion pls :P'}); //deberia ser 403
    //Validamos token y expiracion??
    if(!validateToken(token)){
      //retorna datos de usuario
      return res.status(200).json({ message: 'Bienvenido', code:200, data:token});
    }else {
      return res.status(500).json({ message: 'Token inválido', code:500});
    }
  } catch (error) {
      return res.status(500).json({ message: 'Error: '+error, code:500});
  }
};

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
    idUser: data.idUsers,
    name: data.name,
    lastName: data.lastName,
    rut: data.rut,
    phone: data.phone,
    email: data.email,
    password: data.password
  }
  const token = jwt.sign(u, process.env.API_KEY, {
    expiresIn: 60 * 60 * 24,  //Cuanto tiempo es?? 3min? nop, mucho más
  });
  return token;
}

function validateToken(data) {
  const token = jwt.verify(data, process.env.API_KEY, (err, token) => {
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
    //console.log('Intentamos logear')
    try {
      //Obtiene los datos de formulario
      const {email, password} = req.body;
      //Se encripta la contraseña con bcrypt
      var hash = await bcrypt.hash(password, 10);
      //Query para buscar email en BD
      let results = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      console.log(parsedata);
      conn.end();
      //Si hay resultados
      if(parsedata.length>0){
          //Guardamos hash de BD
          const storedPass = parsedata[0]['hash'];
          //Validamos que password es igual a hash de BD
          const match = await bcrypt.compare(password, storedPass);
          //console.log(storedPass);
          if(match){
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

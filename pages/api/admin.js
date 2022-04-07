import { conn } from '../../config/db';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await loadTravelsForTickets(req, res);
    case 'POST':
      return await createTravel(req, res);
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
  const token = jwt.sign(u, process.env.API_KEY, {
    expiresIn: 60 * 60 * 24,  //Cuanto tiempo es?? 3min?
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
              return res.status(200).json({ message:'Ya registrado entonces logeamos', code:200, data: generateToken(parsedata[0])});
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

const createTravel = async (req, res) => {
  try {
    const { info, semana } = req.body;
    const { origen, destino, costoViaje, limitePasajeros, horaSalida } = info;
    const dias = JSON.stringify(semana);
    //console.log(dias);
    //Faltan validaciones en BD //Si es que ya existe
    //Insertamos nuevo viaje
    const result = conn.query('INSERT INTO travels SET ?', {
      origen,
      destino,
      costoViaje,
      limitePasajeros,
      horaSalida,
      dias,
    });
    conn.end();
    //console.log(results);
      return res.status(200).json({ message: 'Viaje creado', code:200});
  } catch (error) {
      return res.status(500).json({ message: ' '+error, code:500});
  }
};

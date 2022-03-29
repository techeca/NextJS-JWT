import { conn } from '../../config/db';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await loadTravelsForTickets(req, res);
    case 'POST':
      return await buscarViajes(req, res);
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
function checkDiaViaje(data, diaSerch){
  var test = [];
  var checkDia = false;
  data.map((viaje) => {test.push(viaje['dias'])})
  //Buscamos si hay pasajes comparando el dia seleccionado del calendario //se convierte a dia de semana
  //Y se compara para ver si hay viajes ese dia de la semana //lunes, martes, miercoles, etc...
  test.map((dia) => {
    if(JSON.parse(dia)[`${diaSerch}`]){
      //console.log('pasaje encontrado');
      checkDia = true;
    }else {
      //console.log('no hay pasajes');
      checkDia = false;
    }
  })
  return checkDia;
}

const buscarViajes = async (req, res) => {
    //console.log(authHeader);
    //console.log('Intentamos buscar viaje')
    try {
      //Obtiene los datos de formulario
      const {origen, destino, horaSalida, fecha} = req.body;
      //Se encripta la contraseña con bcrypt
      //var hash = await bcrypt.hash(password, 10);
      //Query para buscar email en BD
      let results = await conn.query('SELECT * FROM travels WHERE origen = ? && destino = ?', [origen, destino]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //console.log(checkDiaViaje(parsedata, fecha.diaSemana));
      //Si hay resultados
      if(parsedata.length>0){
          //Verificamos que hay viajes ese dia de la semana
          if(checkDiaViaje(parsedata, fecha.diaSemana)){
            return res.status(200).json({ message:'Encontramos Viajes', code:200, data: parsedata});
          }else {
            return res.status(500).json({ message: 'No se encontrarón pasajes con los valores ingresados', code:500});
          }
      }else {
        //No se encuentran viajes
        return res.status(500).json({ message: 'No encontramos Viajes', code:500});
      }
    } catch (error) {
      //Cualquier otro error
        return res.status(500).json({ message: ' '+error, code:500});
    }
};

const loadTravelsForTickets = async (req, res) => {
  try {
    //obtenemos Origenes
    let results = await conn.query('SELECT DISTINCT origen FROM travels');
    const stringdata = JSON.stringify(results);
    const parsedata = JSON.parse(stringdata);
    conn.end();
    //console.log(results);
      return res.status(200).json({ message: 'Datos obtenidos', code:200, origen:parsedata});
  } catch (error) {
      return res.status(500).json({ message: ' '+error, code:500});
  }
};

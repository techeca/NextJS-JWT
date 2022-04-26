import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getTravels();
    case 'POST':
        return getTravelDetails();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  function checkDiaViaje(data, diaSerch){
    var test = [];
    var checkDia = false;
    data.map((viaje) => {test.push(viaje['dias'])})
    //Buscamos si hay pasajes comparando el dia seleccionado del calendario //se convierte a dia de semana
    //Y se compara con los viajes de BD para ver si hay viajes con ese dia de la semana //lunes, martes, miercoles, etc...
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

  async function getTravelDetails(){
    try {
      //Obtiene los datos de formulario
      const {origen, destino, fecha} = JSON.parse(req.body);
      //console.log(req.body)
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT * FROM travels WHERE origen = ? && destino = ?', [origen, destino]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
      if(parsedata.length>0){
          //Verificamos que hay viajes ese dia de la semana
          if(checkDiaViaje(parsedata, fecha.diaSemana)){
            return res.status(200).json({ message:'Viajes encontrados!!', code:200, data: parsedata});
          }else {
            throw  'No hay pasajes para ese día, prueba con otro.'
          }
      }else {
        //No se encuentran viajes
        throw 'No hay pasajes con ese origen/destino'
      }
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }

  async function getTravels(){

    //Obtenemos Origenes y Destinos
    let origenes = await conn.query('SELECT DISTINCT origen FROM travels')
    conn.end()
    let destinos = await conn.query('SELECT DISTINCT destino FROM travels')
    //Get user ID from request
    //const idUser = req.user.sub;
    //Find tickets by user
    //let results = await conn.query('SELECT idTicket, code, fecha , origen, destino, horaSalida, costoViaje, nroAsiento FROM tickets INNER JOIN travels ON tickets.idTravel = travels.idtravel WHERE idUser = ?', [idUser]);
    const stringdata = JSON.stringify(origenes)
    const parsedata = JSON.parse(stringdata)
    const stringdata2 = JSON.stringify(destinos)
    const parsedata2 = JSON.parse(stringdata2)
    //If result > 0
    if(parsedata.length>0){
        //return tickets
             return res.status(200).json({origenes:parsedata, destinos:parsedata2});
        } else {
          //User don't have tickets
          throw 'No tiene pasajes';
        }
  }
}

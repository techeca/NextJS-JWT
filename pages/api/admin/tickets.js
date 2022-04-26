import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getTickets();
    case 'POST':
        return getTicketsById();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getTickets(){
    try {
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT name, lastName, idUsers, idTicket, code, fecha , origen, destino, horaSalida, costoViaje, nroAsiento FROM tickets INNER JOIN travels ON tickets.idTravel = travels.idtravel INNER JOIN users ON tickets.idUser = users.idUsers');
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
          //Verificamos que hay viajes ese dia de la semana
            return res.status(200).json({tickets:parsedata});
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }

  async function getTicketsById(){
    const { idUser } = req.body
    try {
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT name, lastName, idUsers, idTicket, code, fecha , origen, destino, horaSalida, costoViaje, nroAsiento FROM tickets INNER JOIN travels ON tickets.idTravel = travels.idtravel INNER JOIN users ON tickets.idUser = users.idUsers WHERE tickets.idUser = ?', [idUser]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
          //Verificamos que hay viajes ese dia de la semana
            return res.status(200).json({tickets:parsedata});
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }
}

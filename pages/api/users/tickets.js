import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getTickets(req);
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getTickets(){
    //Get user ID from request
    const idUser = req.user.sub;
    //Find tickets by user
    let results = await conn.query('SELECT idTicket, code, fecha , origen, destino, horaSalida, costoViaje, nroAsiento FROM tickets INNER JOIN travels ON tickets.idTravel = travels.idtravel WHERE idUser = ?', [idUser]);
    const stringdata = JSON.stringify(results);
    const parsedata = JSON.parse(stringdata);
    conn.end();
    //If result > 0
    if(parsedata.length>0){
        //return tickets
             return res.status(200).json({pasajes:parsedata});
        } else {
          //User don't have tickets
          throw 'No tiene pasajes';
        }
  }
}

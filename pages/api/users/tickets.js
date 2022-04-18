const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import getConfig from 'next/config';
import { conn } from '../../../config/db';

import {apiHandler} from '../../../helpers/api';
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getTickets(req);
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getTickets(){
    //Se obtiene la id del ususario
    const idUser = req.user.sub;
    //Query para buscar ticket en BD
    let results = await conn.query('SELECT idTicket, code, fecha , origen, destino, horaSalida, costoViaje, nroAsiento FROM tickets INNER JOIN travels ON tickets.idTravel = travels.idtravel WHERE idUser = ?', [idUser]);
    const stringdata = JSON.stringify(results);
    const parsedata = JSON.parse(stringdata);
    conn.end();
    //Si hay resultados
    if(parsedata.length>0){
        //retornamos los pasajes 
             return res.status(200).json({pasajes:parsedata});
        } else {
          //Usuario no tiene pasajes
          throw 'No tiene pasajes';
        }
  }
}

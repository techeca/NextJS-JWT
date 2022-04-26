import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getTravels();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getTravels(){
    try {
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT * FROM travels ');
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
          //Verificamos que hay viajes ese dia de la semana
            return res.status(200).json({travels:parsedata});
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }
}

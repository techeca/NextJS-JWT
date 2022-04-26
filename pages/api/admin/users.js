import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getUsers();
    case 'POST':
        return getUsersById();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getUsers(){
    try {
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT idUsers, name, lastName, rut, phone, email FROM users ');
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultados
          //Verificamos que hay viajes ese dia de la semana
            return res.status(200).json({users:parsedata});
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }

  async function getUsersById(){
    const {idUsers} = req.body

    try {
      //Query para buscar todos los viajes que tienen el mismo origen y destino seleccionado por el usuario
      let results = await conn.query('SELECT idUsers, name, lastName, rut, phone, email FROM users WHERE idUsers = ? ', [idUsers]);
      const stringdata = JSON.stringify(results);
      const parsedata = JSON.parse(stringdata);
      //console.log(parsedata)
      conn.end();
      //Si hay resultados
          //Verificamos que hay viajes ese dia de la semana
            return res.status(200).json({users:parsedata});
    } catch (error) {
      //Cualquier otro error
        throw error
    }
  }
}

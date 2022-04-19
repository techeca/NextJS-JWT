import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return buyTickets();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  function insertTicket(pasaje){
    const result =  conn.query('INSERT INTO tickets SET ?', pasaje);
  }
  function generarPasajes(carrito, idUser){
    let psjs = [];
    carrito.map((p) => {
    let psje = {idTravel:'', idUser:'', nroAsiento:0, clase:'', fecha:'', code:''};
    psje.idTravel = p.info.idtravel;
    psje.idUser = idUser;
    psje.nroAsiento = p.nroAsiento;
    psje.fecha = p.fecha;
    psje.code = p.code;
    insertTicket(psje);
    })
  }

  async function buyTickets(){
    //Get userData y carrito
    const { userData, carrito } = JSON.parse(req.body)
    try {
      //Check si el usuario esta logeado o no, se envia info user con/sin token para diferenciar
      if(userData.token){
        //Obtenemos id del usuario registrado
        let results = await conn.query('SELECT idUsers FROM users WHERE rut = ? && email = ?', [userData.rut, userData.email])
        const stringdata = JSON.stringify(results)
        const pd = JSON.parse(stringdata)
        const tempid = pd[0]['idUsers']
        conn.end()
        generarPasajes(carrito, tempid)
        //console.log()
        return res.status(200).json({userData})
      }else {
        console.log(userData)
        console.log('no logeado')
      }
    } catch (e) {
      throw 'Error, no se pudo realizar la compra'
    }
  }
}

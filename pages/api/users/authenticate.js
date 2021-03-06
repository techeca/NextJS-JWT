const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
import getConfig from 'next/config'
import { conn } from '@config/db'
import {apiHandler} from '@helpers/api'
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return authenticate()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function authenticate(){
    //console.log(req.body)
    const {username, password} = JSON.parse(req.body)
    //Se encripta la contraseña con bcrypt
    var hash = await bcrypt.hash(password, 10);
    //Query para buscar email en BD
    let results = await conn.query('SELECT email, hash FROM users WHERE email = ?', [username])
    const stringdata = JSON.stringify(results)
    const parsedata1 = JSON.parse(stringdata)
    conn.end()
    
    //Si hay resultados
    if(parsedata1.length>0){
        //Guardamos hash de BD
        const storedPass = parsedata1[0]['hash']
        //Validamos que password es igual a hash de BD
        const match = await bcrypt.compare(password, storedPass);
        if(match){
            let results2 = await conn.query('SELECT idUsers, name, lastName, rut, phone, email, hash FROM users WHERE email = ?', [username])
            const stringdata2 = JSON.stringify(results2)
            const parsedata = JSON.parse(stringdata2)
            conn.end()
            //Enviamos token con los datos del usuario
            //res.cookie('token', generateToken(parsedata[0]), {maxAge: 300 * 1000});
            const token = jwt.sign({sub: parsedata[0]['idUsers']}, serverRuntimeConfig.secret, {expiresIn:'7d'})
            return res.status(200).json({
              name: parsedata[0]['name'],
              lastName: parsedata[0]['lastName'],
              rut: parsedata[0]['rut'],
              phone: parsedata[0]['phone'],
              email: parsedata[0]['email'],
              token
            })
          }else {
            //Pasword y hash distintos
            throw 'Username or password is incorrect'
          }
        }
  }
}

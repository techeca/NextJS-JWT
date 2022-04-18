const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import getConfig from 'next/config';
import { conn } from '../../../config/db';

import {apiHandler} from '../../../helpers/api';
const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return register();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function register(){
      //Obtiene los datos de formulario
      const { name, lastName, rut, phone, email, password} = JSON.parse(req.body);
      //Se encripta la contraseña con bvrypt
      var hash = await bcrypt.hash(password, 10);
      //Valida que RUT e Email no estan registrado
      let results = await conn.query('SELECT * FROM users WHERE email = ? OR rut = ? ', [email, rut]);
      //const stringdata = JSON.stringify(results);
      //const parsedata = JSON.parse(stringdata);
      conn.end();
      //Si hay resultado envía error, si no envía la INSERT
      if(results.length === 0){
          try {
            const result = conn.query('INSERT INTO users SET ?', {
            name,
            lastName,
            rut,
            phone,
            email,
            hash,
            password,
            });
            conn.end();
            return res.status(200).json({
              name: name,
              lastName: lastName,
              rut: rut,
              phone: phone,
              email: email
            });
          } catch (e) {
            throw `${e}`
          }
        } else {
            throw 'Email, RUT or Phone already registered'
      }
    }
}

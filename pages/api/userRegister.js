import { conn } from '../../config/db';

const bcrypt = require('bcrypt');

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res);
    case 'POST':
      return await saveUser(req, res);
    default:
      return res.status(400).send('Method not allowed');
  }
}

const getUsers = async (req, res) => {
  try {
    //Obtiene los datos de formulario
    const {email, password} = req.body;
    //Se encripta la contraseña con bvrypt
    //var hash = await bcrypt.hash(password, 10);
    //Valida que RUT e Email no estan registrado
    let results = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    const stringdata = JSON.stringify(results);
    const parsedata = JSON.parse(stringdata);
    conn.end();
    //Si hay resultado envía error, si no envía la INSERT
    console.log(email);
    if(parsedata.length>0){
      return res.status(200).json({ message:'Ya registrado entonces logeamos', code:200})
    }else {
      //logeado
      return res.status(500).json({ message: 'que usuario es este?', code:500});
    }
  } catch (error) {
      return res.status(500).json({ message: 'Error: '+error, code:500});
  }
};

const saveUser = async (req, res) => {
  try {
    //Obtiene los datos de formulario
    const { name, lastName, rut, phone, email, password} = req.body;
    //Se encripta la contraseña con bvrypt
    var hash = await bcrypt.hash(password, 10);
    //Valida que RUT e Email no estan registrado
    let results = await conn.query('SELECT * FROM users WHERE email = ? OR rut = ? ', [email, rut]);
    const stringdata = JSON.stringify(results);
    const parsedata = JSON.parse(stringdata);
    //Si hay resultado envía error, si no envía la INSERT
    if(parsedata.length>0){
      return res.json({message:'RUT o Correo ya registrado', code:500})
    }else {
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
      return res.status(200).json({ message: 'Nuevo usuario registrado', code:200});
    }
  } catch (error) {
      return res.status(500).json({ message: 'Error: '+error, code:500});
  }
};

import { conn } from '../../config/db';
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

//Encrypt password
async function hashIt(password){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
}

const getUsers = async (req, res) => {
  try {
    const result = await conn.query('SELECT * FROM users');
    return res.status(200).json({results});
  } catch (error) {
    return res.status(500).json(results);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { name, lastName, rut, phone, email, password} = req.body;
    const result = await conn.query('SELECT * FROM users WHERE email= SET ?', {
      email,
      password,
    });
  return res.status(200).json({ ...req.body });
} catch (error) {
    return res.status(500).json({ message: error.message});
  }
}

const saveUser = async (req, res) => {
  try {
    const { name, lastName, rut, phone, email, password} = req.body;
    var hash = await bcrypt.hash(password, 10);
    const result = conn.query('INSERT INTO users SET ?', {
      name,
      lastName,
      rut,
      phone,
      email,
      hash,
      password,
    });
    if(res.errno === 200){
      return res.status(200).json({ message: 'Usuario creado', code:200 });
    }else if(res.status === 500) {
      return res.status(500).json({ message: 'Email o Rut ya utilizados', code:500});
    }
  } catch (error) {
    if(error.parent.code === 'ER_DUP_ENTRY'){
      return res.status(500).json({ message: 'Rut ya utilizado', code:500});
    }else if(error.code){
      return res.status(500).json({ message: 'Rut ya utilizado', code:500});
    }
  }
};

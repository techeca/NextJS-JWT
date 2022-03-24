import { conn } from 'config/db';

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
    var correo = 'dfdfd';
    const result = await conn.query('SELECT * FROM users');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(result);
  }
};

const saveUser = async (req, res) => {
  try {
    const { name, lastName, rut, phone, email} = req.body;
    const result = await conn.query('INSERT INTO users SET ?', {
      name,
      lastName,
      rut,
      phone,
      email,
      password,
    });
  return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
};

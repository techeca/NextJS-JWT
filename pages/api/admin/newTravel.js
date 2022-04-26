import { conn } from '@config/db'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { apiHandler } from '@helpers/api'

export default apiHandler(handler)

function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return createTravel();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

function createTravel(){
  const { datosViaje, semana } = req.body
  const { origen, destino, costoViaje, limitePasajeros, horaSalida } = datosViaje;
  const dias = JSON.stringify(semana);
    //const authHeader = req.headers['authorization'];
    //Obtenemos token
        try {
          //Se encripta la contraseña con bcrypt
          //var hash = await bcrypt.hash(password, 10)
          const result = conn.query('INSERT INTO travels SET ?', {
            origen,
            destino,
            costoViaje,
            limitePasajeros,
            horaSalida,
            dias,
          });
          conn.end();
            return res.status(200).json({result})
        } catch (e) {
          throw `${e}`
        }
  }

  async function register(){
      //Obtiene los datos de formulario
      const { name, lastName, rut, phone, email, password} = JSON.parse(req.body)
      //Valida que RUT e Email no estan registrado
      let results = await conn.query('SELECT * FROM users WHERE email = ? OR rut = ? ', [email, rut])
      //const stringdata = JSON.stringify(results);
      //const parsedata = JSON.parse(stringdata);
      conn.end()
      //Si hay resultado envía error, si no envía la INSERT
      if(results.length === 0){
          try {
            //Se encripta la contraseña con bcrypt
            var hash = await bcrypt.hash(password, 10)
            const result = conn.query('INSERT INTO users SET ?', { name, lastName, rut, phone, email, hash, password })
            conn.end()
            //Retorna los datos de usuario //FALTA TOKEN
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

  const createTravel2 = async (req, res) => {
    //console.log(req.body)
    try {
      const { info, semana } = req.body;
      const { origen, destino, costoViaje, limitePasajeros, horaSalida } = info;
      const dias = JSON.stringify(semana);
      //console.log(dias);
      //Faltan validaciones en BD //Si es que ya existe
      //Insertamos nuevo viaje
      const result = conn.query('INSERT INTO travels SET ?', {
        origen,
        destino,
        costoViaje,
        limitePasajeros,
        horaSalida,
        dias,
      });
      conn.end();
      //console.log(results);
        return res.status(200).json({ message: 'Viaje creado', code:200});
    } catch (error) {
        return res.status(500).json({ message: ' '+error, code:500});
    }
  }

}

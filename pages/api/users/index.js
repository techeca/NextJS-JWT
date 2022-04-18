import { apiHandler } from '../../../helpers/api'
import { userService} from '../../../services'

export default apiHandler(handler);


function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getUserInfo();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }



  function getUserInfo(){
    const tmp = userService.userValue;

    const authHeader = req.headers['authorization'];
    //Obtenemos token
    const token = authHeader && authHeader.split(' ')[1];
    //const prstkn = parseToken(token);
    //console.log(req.cookies);

    return res.status(200).json(tmp);
  }

}

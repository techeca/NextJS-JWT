import { errorHandler, jwtMiddleware } from '../../helpers/api'

export {apiHandler};

function apiHandler(handler){
  return async (req, res) => {
    //console.log(req.headers.authorization)
    try {
      await jwtMiddleware(req, res);
      await handler(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  }
}

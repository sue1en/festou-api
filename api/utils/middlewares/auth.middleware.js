const userService = require('../../services/user.service')
const cryptoUtils = require('../cryptography.utils')

exports.actionAuth = (rota = '*') => {
  return async = (req, res, next) => {
    const { token } = req.headers;

    if(!token){
      return res.status(403).send({message: "Usuário não autorizado"})
    }
    
    if(!cryptoUtils.validateToken(token)){
     return res
      .status(401)
      .send({message: "Usuário não autenticado."})
    }

    const { id, email, kind } = cryptoUtils.decodeToken(token);

    if(!(await userService.isEmailRegistered(email))){
      return res.status(403).send({message: "usuário não autorizado."})
    }

    if(rota != '*'){
      if(!userService.validateProfileActions(email, rota)){
        return res.status(403).send({ message: "usuário não autorizado." })
      }
    }
    req.user = {
      id,
      email,
      kind,
    }
    
    return next()
  }
}
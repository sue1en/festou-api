const { isEmailRegistered, validateProfileActions } = require('../../services/user.service');
const cryptoUtils = require('../cryptography.utils');

const NotAuthenticatedUserError = require('../errors/error-not-authenticated-user');
const NotAuthorizedUserError = require('../errors/error-not-authorized-user');


const actionAuth = (route = '*') => {
  return async (req, res, next) => {
    const routeTest = route;

    const { token } = req.headers;
    if(!token){
      throw new NotAuthenticatedUserError('Oops! User not authenticated!')
    };
    
    if(!cryptoUtils.validateToken(token)){
      throw new NotAuthorizedUserError('Oops! User not authorized!');
    }
    
    const { id, email, kind } = cryptoUtils.decodeToken(token);
    
    if(! (await isEmailRegistered(email))){
     throw new NotAuthorizedUserError('Oops! User not authorized!');
    }
    
    if(routeTest != '*'){
      if(!await validateProfileActions(kind, routeTest))
        throw new NotAuthorizedUserError('Oops! User not authorized!');
    }
    req.user = {
      id,
      email,
      kind,
    }
    
    return next()
  }
}

module.exports = {
  actionAuth,
}
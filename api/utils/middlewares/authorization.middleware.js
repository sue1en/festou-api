const { isEmailRegistered, validateProfileActions } = require('../../services/user.service');
const cryptoUtils = require('../cryptography.utils');

const NotAuthenticatedUserError = require('../errors/error-not-authenticated-user');
const NotAuthorizedUserError = require('../errors/error-not-authorized-user');


const actionAuth = (route = '*') => {
  return async (req, res, next) => {
    const routeTest = route;
    console.log(routeTest);
    const { token } = req.headers;
    if(!token){
      throw new NotAuthorizedUserError('Oops! User not authorized!');
    };
    
    if(!cryptoUtils.validateToken(token)){
      throw new NotAuthenticatedUserError('Oops! User not authenticated!')
    }
    
    const { id, email, kind } = cryptoUtils.decodeToken(token);
    
    if(! (await isEmailRegistered(email))){
     throw new NotAuthorizedUserError('Oops! User not authorized!');
    }
    
    if(routeTest != '*'){
      if(!await validateProfileActions(kind, routeTest))
      throw new NotAuthenticatedUserError('Oops! User not authenticated!')
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
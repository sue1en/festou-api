const status = require('http-status');
const defaultMessage = 'Oops! User not authorized!'
const GenericError = require('./error-generic');

module.exports = class NotAuthorizedUserError
extends GenericError {
  constructor(message){
    super(message);
    Error.captureStackTrace(this, NotAuthorizedUserError);
    this.statusCode = status.FORBIDDEN;
    this.message = message || defaultMessage;
  }
};
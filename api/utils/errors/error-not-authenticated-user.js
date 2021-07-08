const status = require('http-status');
const defaultMessage = 'Oops! User not authenticated!';
const GenericError = require('./error-generic');

module.exports = class NotAuthenticatedUserError
extends GenericError {
  constructor(message){
    super(message);
    Error.captureStackTrace(this, NotAuthenticatedUserError);
    this.statusCode = status.UNAUTHORIZED;
    this.message = message || defaultMessage;
  }
}
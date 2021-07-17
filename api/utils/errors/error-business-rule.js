const status = require('http-status');
const defaultMessage = 'Oops! A business rule error has occurred!';

const GenericError = require('./error-generic');

module.exports = class BusinessRuleError
extends GenericError {
  constructor(message){
    super(message);
    Error.captureStackTrace(this, BusinessRuleError);
    this.statusCode = status.BAD_REQUEST;
    this.message = message || defaultMessage;
  }
};
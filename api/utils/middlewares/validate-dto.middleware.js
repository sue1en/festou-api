const Joi = require('joi');
const BusinessRuleError = require('../errors/error-business-rule');

const validateDTO = (type, param, options = {}) => {
  return async (req, res, next) => {
    const schema = Joi.object().keys(param);
    const result = schema.validate(req[type], {
      allowUnknown: false,
      ...options,
    });

    if(result.error) {
      const messages = result.error.details.reduce((acc, item) => {
        return [
          ...acc, item.message
        ]
      }, []);
      
      throw new BusinessRuleError(messages)
    }
  return next();
  }
};

module.exports = validateDTO
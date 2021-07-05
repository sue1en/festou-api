const joi = require('joi');

const validateDTO = (type, param, options = {}) => {
  return (req, res, next) => {
    const schema = joi.object().keys(param);
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
      res.status(400).send({
        //acc significa aacumulador
        success: false,
        details: [
          ...messages
        ]
      })
      return
    }
  return next();
  }
};

module.exports = validateDTO
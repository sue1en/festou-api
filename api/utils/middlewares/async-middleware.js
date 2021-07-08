const GenericError = require('../errors/error-generic');

const asyncMiddleware = (fn, options) => (req, res, next) => {
  fn(req, res, next)
  .catch(error => {
    if (error instanceof GenericError) {
      return res.status(error.statusCode).send({
        details: [
          error.message,
        ]
      });
    } else {
      console.log(error.stack)
      return res.status(500).send({
        message: 'An internal error has occurred.'
      });
    }
  });
};

module.exports = asyncMiddleware
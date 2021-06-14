const userController = require('../../controllers/user.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const joi = require('joi');

module.exports = (Router) => {
  Router
    .route('/auth')
    .post(
      validateDTO('body', {
        email: joi.string().required().messages({
            'any.required': `"e-mail" é um campo obrigatório`,
            'string.empty': `"e-mail" não deve ser vazio`,
          }),
        password: joi.string().required().messages({
          'any.required': `"senha" é um campo obrigatório`,
          'string.empty': `"senha" não deve ser vazio`,
          })
      }),
      userController.authCTRL
    )

  Router
    .route('/newadmin')
    .post(
      validateDTO('body', {
        name: joi.string().required().messages({
          'any.required': `"name" é um campo obrigatório`,
          'string.empty': `"name" não deve ser vazio`,
          }),
        email: joi.string().required().messages({
            'any.required': `"e-mail" é um campo obrigatório`,
            'string.empty': `"e-mail" não deve ser vazio`,
          }),
        password: joi.string().required().messages({
          'any.required': `"senha" é um campo obrigatório`,
          'string.empty': `"senha" não deve ser vazio`,
          }),
        kind: joi.string().required().messages({
          'any.required': `"kind" é um campo obrigatório`,
          'string.empty': `"kind" não deve ser vazio`,
          })
      }),
      userController.createAdminCTRL
    )

}
const adminController = require('../../controllers/admin.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware');
const joi = require('joi');

module.exports = (Router) => {

  Router
    .route('/newadmin')
    .post(
      asyncMiddleware(validateDTO('body', {
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
      })),
      asyncMiddleware(adminController.createAdminCTRL)
    )
  Router
    .route('/systemadmin')
    .get(
      asyncMiddleware(authMiddleware.actionAuth('GET_ALL_ADMIN')),
      asyncMiddleware(adminController.getAllAdmin)
    )
  Router
    .route('/systemadmin/:adminId')
    .get(
      asyncMiddleware(authMiddleware.actionAuth('GET_BY_ID_ADMIN')),
      asyncMiddleware(validateDTO('params', {
        adminId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"adminId" é um campo obrigatório`,
          'string.empty': `"adminId" não deve ser vazio`,
        }),
      })),
      asyncMiddleware(adminController.getAdminById)
    )
}
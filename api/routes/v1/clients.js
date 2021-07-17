const clientsController = require('../../controllers/clients.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware')

module.exports = (Router) => {
  
  Router
    .route('/clients')
    .get(
      asyncMiddleware(authMiddleware.actionAuth('GET_ALL_CLIENTS')),
      asyncMiddleware(clientsController.getAllClientsCTRL)
    )
    .post(
      fileUploadMiddleware('clients'),
      asyncMiddleware(validateDTO("body", {
        name: joi.string().required().messages({
          'any.required': `"name" é um campo obrigatório`,
          'string.empty': `"name" não deve ser vazio`,
        }),
        birthdate: joi.string().required().messages({
          'any.required': `"birthdate" é um campo obrigatório`,
          'string.empty': `"birthdate" não deve ser vazio`,
        }),
        address: joi.string().required().messages({
          'any.required': `"address" é um campo obrigatório`,
          'string.empty': `"address" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
        }),
        city: joi.string().required().messages({
          'any.required': `"city" é um campo obrigatório`,
          'string.empty': `"city" não deve ser vazio`,
        }),
        phoneNumber: joi.number().required().messages({
          'any.required': `"phoneNumber" é um campo obrigatório`,
          'string.empty': `"phoneNumber" não deve ser vazio`,
        }),
        email: joi.string().required().messages({
          'any.required': `"email" é um campo obrigatório`,
          'string.empty': `"email" não deve ser vazio`,
        }),
        password: joi.string().required().messages({
          'any.required': `"password" é um campo obrigatório`,
          'string.empty': `"password" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      })),
      asyncMiddleware(clientsController.createClientsCTRL)
    )

  Router
    .route('/clients/:clientId')
    .get(
      asyncMiddleware(authMiddleware.actionAuth('GET_BY_ID_CLIENT')),
      asyncMiddleware(validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      })),  
      asyncMiddleware(clientsController.getClientsByIdCTRL)
    )
    .put(
      asyncMiddleware(authMiddleware.actionAuth('EDIT_CLIENT')),
      asyncMiddleware(fileUploadMiddleware('clients')),
      asyncMiddleware(validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      })),  
      asyncMiddleware(validateDTO("body", {
        name: joi.string().required().messages({
          'any.required': `"name" é um campo obrigatório`,
          'string.empty': `"name" não deve ser vazio`,
        }),
        birthdate: joi.string().required().messages({
          'any.required': `"birthdate" é um campo obrigatório`,
          'string.empty': `"birthdate" não deve ser vazio`,
        }),
        address: joi.string().required().messages({
          'any.required': `"address" é um campo obrigatório`,
          'string.empty': `"address" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
        }),
        city: joi.string().required().messages({
          'any.required': `"city" é um campo obrigatório`,
          'string.empty': `"city" não deve ser vazio`,
        }),
        phoneNumber: joi.number().required().messages({
          'any.required': `"phoneNumber" é um campo obrigatório`,
          'string.empty': `"phoneNumber" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      })),
      asyncMiddleware(clientsController.editClientsCTRL)
    )
  
  Router
    .route('/clients/:clientId/delete')
    .delete(
      asyncMiddleware(authMiddleware.actionAuth('DELETE_CLIENT')),
      asyncMiddleware(validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      })),
      asyncMiddleware(clientsController.deleteClientsCTRL)
    )
  
    Router
  .route('/clients/:clientId/ativa')
  .put(
    asyncMiddleware(authMiddleware.actionAuth('ACTIVATE_CLIENT')),
    asyncMiddleware(validateDTO("params", {
      clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"clientsId" é um campo obrigatório`,
        'string.empty': `"clientsId" não deve ser vazio`,
      }),
    })), 
    asyncMiddleware(clientsController.activateClientCTRL)
    )
    
  Router
    .route('/clients/:clientId/inativa')
    .put(
      asyncMiddleware(authMiddleware.actionAuth('DEACTIVATE_CLIENT')),
      asyncMiddleware(validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),
      })), 
      asyncMiddleware(clientsController.deactivateClientCTRL)
    )
}
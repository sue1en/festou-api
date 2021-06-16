const clientsController = require('../../controllers/clients.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware')

module.exports = (Router) => {
  
  Router
    .route('/clients')
    .get(
      authMiddleware.actionAuth('GET_ALL_CLIENTS'),
      clientsController.getAllClientsCTRL)
    .post(
      fileUploadMiddleware('clients'),
      validateDTO("body", {
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
        state: joi.string().required().messages({
          'any.required': `"state" é um campo obrigatório`,
          'string.empty': `"state" não deve ser vazio`,
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
      }),
      clientsController.createClientsCTRL
    )

  Router
    .route('/clients/:clientId')
    .get(
      authMiddleware.actionAuth('GET_BY_ID_CLIENT'),
      validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      }),  
      clientsController.getClientsByIdCTRL
    )
    .put(
      authMiddleware.actionAuth('EDIT_CLIENT'),
      fileUploadMiddleware('clients'),
      validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      }),  
      validateDTO("body", {
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
        state: joi.string().required().messages({
          'any.required': `"state" é um campo obrigatório`,
          'string.empty': `"state" não deve ser vazio`,
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
      }),
      clientsController.editClientsCTRL
    )
  
  Router
    .route('/clients/:clientId/delete')
    .delete(
      authMiddleware.actionAuth('DELETE_CLIENT'),
      validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),  
      }),
      clientsController.deleteClientsCTRL
    )
  
    Router
  .route('/clients/:clientId/ativa')
  .put(
    authMiddleware.actionAuth('ACTIVATE_CLIENT'),
    validateDTO("params", {
      clientsId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"clientsId" é um campo obrigatório`,
        'string.empty': `"clientsId" não deve ser vazio`,
      }),
    }), 
    clientsController.activateClientCTRL
    )
    
  Router
    .route('/clients/:clientId/inativa')
    .put(
      authMiddleware.actionAuth('DEACTIVATE_CLIENT'),
      validateDTO("params", {
        clientId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"clientId" é um campo obrigatório`,
          'string.empty': `"clientId" não deve ser vazio`,
        }),
      }), 
      clientsController.deactivateClientCTRL
    )
}
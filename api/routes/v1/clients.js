const clientsController = require('../../controllers/clients.controller');
const joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const { Router } = require('express');

module.exports = (Router) => {

  Router
    .route('/clients')
    .get(clientsController.getAllClientsCTRL)
    .post(
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
      }),
      clientsController.createClientsCTRL
    )
}
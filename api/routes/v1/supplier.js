const supplierController = require('../../controllers/supplier.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const joi = require('joi')

module.exports = (Router) => {
  //
  //cria e retorna todos
  Router
    .route('/fornecedor')
    .get(supplierController.getAllSupplierCTRL)
    .post(
      validateDTO("body", {
        cnpj: joi.number().required().messages({
          'any.required': `"cnpj" é um campo obrigatório`,
          'string.empty': `"cnpj" não deve ser vazio`,
        }),
        tradeName: joi.string().required().messages({
          'any.required': `"tradeName" é um campo obrigatório`,
          'string.empty': `"tradeName" não deve ser vazio`,
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
        phoneNumber: joi.string().required().messages({
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
      supplierController.createSupplierCTRL
    )
    

  //retorna por id / edita
  Router
    .route('/fornecedor/:supplierId')
    .get(
      validateDTO("params", {
        supplierId: joi.string().required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }),
      supplierController.getSupplierByIdCTRL
    )
    .put(
      validateDTO("params", {
        supplierId: joi.string().required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }),
      validateDTO("body", {
        cnpj: joi.number().required().messages({
          'any.required': `"cnpj" é um campo obrigatório`,
          'string.empty': `"cnpj" não deve ser vazio`,
        }),
        tradeName: joi.string().required().messages({
          'any.required': `"tradeName" é um campo obrigatório`,
          'string.empty': `"tradeName" não deve ser vazio`,
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
        phoneNumber: joi.string().required().messages({
          'any.required': `"phoneNumber" é um campo obrigatório`,
          'string.empty': `"phoneNumber" não deve ser vazio`,
        }),
      }),
      supplierController.editSupplierCTRL
    )
    
  //deleta
  Router
    .route('/fornecedor/:supplierId')
    .delete(
      validateDTO("params", {
        supplierId: joi.string().required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }), 
      supplierController.deleteSupplierCTRL
    )

  Router
  .route('/fornecedor/:supplierId/ativa')
  .put(
    validateDTO("params", {
      supplierId: joi.string().required().messages({
        'any.required': `"supplierId" é um campo obrigatório`,
        'string.empty': `"supplierId" não deve ser vazio`,
      }),
    }), 
    supplierController.activateSupplierCTRL
    )
    
  Router
    .route('/fornecedor/:supplierId/inativa')
    .put(
      validateDTO("params", {
        supplierId: joi.string().required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }), 
      supplierController.deactivateSupplierCTRL
    )



}
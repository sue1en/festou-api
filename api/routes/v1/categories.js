const categoriesController = require('../../controllers/categories.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware')
const joi = require('joi');

module.exports = (Router) => {
  Router
    .route('/categorias')
    .get(categoriesController.getAllCategoriesCTRL)
    .post(
      fileUploadMiddleware('categorias'),
      // authMiddleware.actionAuth('CREATE_CATEGORY'),
      validateDTO("body", {
        name: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      categoriesController.createCategoriesCTRL
    )
  Router
    .route('/categorias/:categoryId')
    .get(
      validateDTO("params", {
        categoryId: joi.string().required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      }),
      categoriesController.getCategoryByIdCTRL
    )
    .delete(
      validateDTO("params", {
        categoryId: joi.string().required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      }),
      categoriesController.deleteCategoriesCTRL
    )
    .put(
      // authMiddleware.actionAuth('CREATE_CATEGORY'),
      fileUploadMiddleware('categorias', true),
      validateDTO("params", {
        categoryId: joi.string().required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      }),
      validateDTO("body", {
        name: joi.string().required().messages({
          'any.required': `"nome" é um campo obrigatório`,
          'string.empty': `"nome" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          'any.required': `"descricao" é um campo obrigatório`,
          'string.empty': `"descricao" não deve ser vazio`,
        }),
        status: joi.boolean().required().messages({
          'any.required': `"status" é um campo obrigatório`,
          'booleam.empty': `"status" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      categoriesController.editCategoriesCTRL
    )

  Router
    .route('/categorias/:categoryId/products')
    .get(
      validateDTO("params", {
        categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
    }),
      categoriesController.getProductsByCategoryCTRL
    )


    

}
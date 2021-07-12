const categoriesController = require('../../controllers/categories.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const joi = require('joi');

module.exports = (Router) => {
  Router
    .route('/categorias')
    .get(
      asyncMiddleware(categoriesController.getAllCategoriesCTRL)
    )
    .post(
      fileUploadMiddleware('categorias'),
      asyncMiddleware(authMiddleware.actionAuth('CREATE_CATEGORY')),
      asyncMiddleware(validateDTO("body", {
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
      })),
      asyncMiddleware(categoriesController.createCategoriesCTRL)
    )
  Router
    .route('/categorias/:categoryId')
    .get(
      asyncMiddleware(validateDTO("params", {
        categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(categoriesController.getCategoryByIdCTRL)
    )
    .delete(
      asyncMiddleware(authMiddleware.actionAuth('DELETE_CATEGORY')),
      asyncMiddleware(validateDTO("params", {
        categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(categoriesController.deleteCategoriesCTRL)
    )
    .put(
      asyncMiddleware(authMiddleware.actionAuth('EDIT_CATEGORY')),
      fileUploadMiddleware('categorias', true),
      asyncMiddleware(validateDTO("params", {
        categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(validateDTO("body", {
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
      })),
      asyncMiddleware(categoriesController.editCategoriesCTRL)
    )

  Router
    .route('/categorias/:categoryId/products')
    .get(
      asyncMiddleware(validateDTO("params", {
        categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoryId" é um campo obrigatório`,
          'string.empty': `"categoryId" não deve ser vazio`,
        })
    })),
      asyncMiddleware(categoriesController.getProductsByCategoryCTRL)
    )

}
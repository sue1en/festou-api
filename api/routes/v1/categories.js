const categoriesController = require('../../controllers/categories.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const joi = require('joi');

module.exports = (Router) => {
  Router
    .route('/categorias')
    .get(categoriesController.getAllCategoriesCTRL)
    .post(
      fileUploadMiddleware('categorias'),
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
    .route('/categorias/:categoriaId')
    .get(
      validateDTO("params", {
        categoriaId: joi.string().required().messages({
          'any.required': `"categoria Id" é um campo obrigatório`,
          'string.empty': `"categoria Id" não deve ser vazio`,
        })
      }),
      categoriesController.getCategoryByIdCTRL
    )
    .delete(
      validateDTO("params", {
        categoriaId: joi.string().required().messages({
          'any.required': `"categoria Id" é um campo obrigatório`,
          'string.empty': `"categoria Id" não deve ser vazio`,
        })
      }),
      categoriesController.deleteCategoriesCTRL
    )
    .put(
      fileUploadMiddleware('categorias'),
      validateDTO("params", {
        categoriaId: joi.string().required().messages({
          'any.required': `"categoria Id" é um campo obrigatório`,
          'string.empty': `"categoria Id" não deve ser vazio`,
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


}
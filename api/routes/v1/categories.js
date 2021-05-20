const categoryController = require('../../controllers/category.controller');
const categoriesController = require('../../controllers/category.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const joi = require('joi');

module.exports = (Router) => {
  Router
    .route('/categorias')
    .get(categoriesController.getAllCategoryCTRL)
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
      categoryController.createCategoryCTRL
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
      categoryController.getByIdCategoryCTRL
    )
    .delete(
      validateDTO("params", {
        categoriaId: joi.string().required().messages({
          'any.required': `"categoria Id" é um campo obrigatório`,
          'string.empty': `"categoria Id" não deve ser vazio`,
        })
      }),
      categoryController.deleteCategoryCTRL
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
      categoryController.editCategoryCTRL
    )


}
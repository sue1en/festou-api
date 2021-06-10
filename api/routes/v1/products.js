const productsController = require('../../controllers/products.controller');
const joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUploadMiddleware = require('../../utils/middlewares/validate-dto.middleware');
const { string } = require('joi');

module.exports = (Router) => {
  Router
    .route('/products')
    .get(productsController.getAllProductCTRL)
    
    
  Router
    .route('/products/:productId')
    .get(validateDTO("params", {
      productId: joi.string().required().messages({
        'any.required': `"productId" é um campo obrigatório`,
        'string.empty': `"productId" não deve ser vazio`,
      }),  
    }),  
      productsController.getProductByIdCTRL
    )
    
    
}
const productsController = require('../../controllers/products.controller');
const joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const fileUploadMiddleware = require('../../utils/middlewares/validate-dto.middleware');
const { string } = require('joi');

module.exports = (Router) => {
  Router
    .route('/products')
    .get(
      asyncMiddleware(productsController.getAllProductCTRL)
    )
    
    
  Router
    .route('/products/:productId')
    .get(
      asyncMiddleware(validateDTO("params", {
        productId: joi.string().required().messages({
          'any.required': `"productId" é um campo obrigatório`,
          'string.empty': `"productId" não deve ser vazio`,
        }),  
      })),  
      asyncMiddleware(productsController.getProductByIdCTRL)
    )
       
}
const supplierController = require('../../controllers/supplier.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const joi = require('joi')

module.exports = (Router) => {
//cria 
Router
  .route('/fornecedor')
  .post()
  
//retorna todos
Router
  .route('/fornecedor')
  .get()

//retorna por id / edita
Router
  .route('/fornecedor/:supplierid')
  .get()
  .put()
  
//deleta
Router
  .route('/fornecedor/:supplierid')
  .delete()
  
}
const supplierController = require('../../controllers/supplier.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const productsController = require('../../controllers/products.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const authMiddleware = require('../../utils/middlewares/authorization.middleware')
const joi = require('joi')

module.exports = (Router) => {
  //
  //cria e retorna todos
  Router
    .route('/supplier')
    .get(supplierController.getAllSupplierCTRL)
    .post(
      fileUploadMiddleware('supplier'),
      validateDTO("body", {
        cnpj: joi.number().required().messages({
          'any.required': `"cnpj" é um campo obrigatório`,
          'string.empty': `"cnpj" não deve ser vazio`,
        }),
        tradeName: joi.string().required().messages({
          'any.required': `"tradeName" é um campo obrigatório`,
          'string.empty': `"tradeName" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          'any.required': `"description" é um campo obrigatório`,
          'string.empty': `"description" não deve ser vazio`,
        }),
        address: joi.string().required().messages({
          'any.required': `"address" é um campo obrigatório`,
          'string.empty': `"address" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
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
      supplierController.createSupplierCTRL
    )
    

  //retorna por id / edita
  Router
    .route('/supplier/:supplierId')
    .get(
      validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }),
      supplierController.getSupplierByIdCTRL
    )
    .put(
      authMiddleware.actionAuth('EDIT_SUPPLIER'),
      fileUploadMiddleware('supplier'),
      validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
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
        description: joi.string().required().messages({
          'any.required': `"description" é um campo obrigatório`,
          'string.empty': `"description" não deve ser vazio`,
        }),
        address: joi.string().required().messages({
          'any.required': `"address" é um campo obrigatório`,
          'string.empty': `"address" não deve ser vazio`,
        }),
        uf: joi.string().required().messages({
          'any.required': `"uf" é um campo obrigatório`,
          'string.empty': `"uf" não deve ser vazio`,
        }),
        city: joi.string().required().messages({
          'any.required': `"city" é um campo obrigatório`,
          'string.empty': `"city" não deve ser vazio`,
        }),
        phoneNumber: joi.string().required().messages({
          'any.required': `"phoneNumber" é um campo obrigatório`,
          'string.empty': `"phoneNumber" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      supplierController.editSupplierCTRL
    )
    
  //deleta
  Router
    .route('/supplier/:supplierId/delete')
    .delete(
      authMiddleware.actionAuth('DELETE_SUPPLIER'),
      validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }), 
      supplierController.deleteSupplierCTRL
    )

  Router
  .route('/supplier/:supplierId/ativa')
  .put(
    authMiddleware.actionAuth('ACTIVATE_SUPPLIER'),
    validateDTO("params", {
      supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"supplierId" é um campo obrigatório`,
        'string.empty': `"supplierId" não deve ser vazio`,
      }),
    }), 
    supplierController.activateSupplierCTRL
    )
    
  Router
    .route('/supplier/:supplierId/inativa')
    .put(
      authMiddleware.actionAuth('DEACTIVATE_SUPPLIER'),
      validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      }), 
      supplierController.deactivateSupplierCTRL
    )

  //_______Produtos
  Router
    .route('/supplier/:supplierId/products')
    .get(
      validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        })
      }),
      supplierController.getProductsBySupplierCTRL
    )
    .post(
      fileUploadMiddleware('products'),
      authMiddleware.actionAuth('CREATE_PRODUCT'),
      validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        })
      }),
      validateDTO('body', {
      name: joi.string().required().messages({
        'any.required': `"name" é um campo obrigatório`,
        'string.empty': `"name" não deve ser vazio`,
      }),
      description: joi.string().required().messages({
        'any.required': `"description" é um campo obrigatório`,
        'string.empty': `"description" não deve ser vazio`,
      }),
      price: joi.number().required().messages({
        'any.required': `"price" é um campo obrigatório`,
        'string.empty': `"price" não deve ser vazio`,
      }),
      // status: joi.boolean().required().messages({
      //   'any.required': `"status" é um campo obrigatório`,
      //   'booleam.empty': `"status" não deve ser vazio`,
      // }),
      categoriesId: joi.string().required().messages({
        'any.required': `"categoriesId" é um campo obrigatório`,
        'string.empty': `"categoriesId" não deve ser vazio`,
      }),
    }, {
      allowUnknown: true,
    }),
    productsController.CreateProductCTRL
  )
  
  Router
    .route('/supplier/:supplierId/products/:productId')
    .put(
      fileUploadMiddleware('products', true),
      authMiddleware.actionAuth('EDIT_PRODUCT'),
      validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
        productId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"productId" é um campo obrigatório`,
          'string.empty': `"productId" não deve ser vazio`,
        })
      }),
      validateDTO('body', {
        name: joi.string().required().messages({
          'any.required': `"name" é um campo obrigatório`,
          'string.empty': `"name" não deve ser vazio`,
        }),
        description: joi.string().required().messages({
          'any.required': `"description" é um campo obrigatório`,
          'string.empty': `"description" não deve ser vazio`,
        }),
        price: joi.number().required().messages({
          'any.required': `"price" é um campo obrigatório`,
          'string.empty': `"price" não deve ser vazio`,
        }),
        // status: joi.boolean().required().messages({
        //   'any.required': `"status" é um campo obrigatório`,
        //   'booleam.empty': `"status" não deve ser vazio`,
        // }),
        categoriesId: joi.string().required().messages({
          'any.required': `"categoriesId" é um campo obrigatório`,
          'string.empty': `"categoriesId" não deve ser vazio`,
        }),
      }, {
        allowUnknown: true,
      }),
      productsController.editProductCTRL
    )
    .delete(
      authMiddleware.actionAuth('DELETE_PRODUCT'),
      validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
        productId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"productId" é um campo obrigatório`,
          'string.empty': `"productId" não deve ser vazio`,
        })
      }),
      productsController.deleteProductCTRL
    )

}
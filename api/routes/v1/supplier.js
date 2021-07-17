const supplierController = require('../../controllers/supplier.controller');
const fileUploadMiddleware = require('../../utils/middlewares/file-upload.middleware');
const productsController = require('../../controllers/products.controller');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const authMiddleware = require('../../utils/middlewares/authorization.middleware');
const asyncMiddleware = require('../../utils/middlewares/async-middleware');
const joi = require('joi')

module.exports = (Router) => {
  //cria e retorna todos
  Router
    .route('/supplier')
    .get(
      asyncMiddleware(supplierController.getAllSupplierCTRL)
    )
    .post(
      asyncMiddleware(fileUploadMiddleware('supplier')),
      asyncMiddleware(validateDTO("body", {
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
      })),
      asyncMiddleware(supplierController.createSupplierCTRL)
    )
    

  //retorna por id / edita
  Router
    .route('/supplier/:supplierId')
    .get(
      asyncMiddleware(validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      })),
      asyncMiddleware(supplierController.getSupplierByIdCTRL)
    )
    .put(
      asyncMiddleware(authMiddleware.actionAuth('EDIT_SUPPLIER')),
      asyncMiddleware(fileUploadMiddleware('supplier')),
      asyncMiddleware(validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      })),
      asyncMiddleware(validateDTO("body", {
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
      })),
      asyncMiddleware(supplierController.editSupplierCTRL)
    )
    
  //deleta
  Router
    .route('/supplier/:supplierId/delete')
    .delete(
      asyncMiddleware(authMiddleware.actionAuth('DELETE_SUPPLIER')),
      asyncMiddleware(validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      })), 
      asyncMiddleware(supplierController.deleteSupplierCTRL)
    )

  Router
  .route('/supplier/:supplierId/ativa')
  .put(
    asyncMiddleware(authMiddleware.actionAuth('ACTIVATE_SUPPLIER')),
    asyncMiddleware(validateDTO("params", {
      supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': `"supplierId" é um campo obrigatório`,
        'string.empty': `"supplierId" não deve ser vazio`,
      }),
    })), 
    asyncMiddleware(supplierController.activateSupplierCTRL)
    )
    
  Router
    .route('/supplier/:supplierId/inativa')
    .put(
      asyncMiddleware(authMiddleware.actionAuth('DEACTIVATE_SUPPLIER')),
      asyncMiddleware(validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      })), 
      asyncMiddleware(supplierController.deactivateSupplierCTRL)
    )

  Router
    .route('/supplier/:supplierId/recusa')
    .put(
      asyncMiddleware(authMiddleware.actionAuth('DENIE_SUPPLIER')),
      asyncMiddleware(validateDTO("params", {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
      })), 
      asyncMiddleware(supplierController.denieSupplierCTRL)
    )

  //_______Produtos
  Router
    .route('/supplier/:supplierId/products')
    .get(
      asyncMiddleware(validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(supplierController.getProductsBySupplierCTRL)
    )
    .post(
      fileUploadMiddleware('products'),
      asyncMiddleware(authMiddleware.actionAuth('CREATE_PRODUCT')),
      asyncMiddleware(validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(validateDTO('body', {
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
    })),
    asyncMiddleware(productsController.CreateProductCTRL)
  )
  
  Router
    .route('/supplier/:supplierId/products/:productId')
    .put(
      fileUploadMiddleware('products', true),
      asyncMiddleware(authMiddleware.actionAuth('EDIT_PRODUCT')),
      asyncMiddleware(validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
        productId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"productId" é um campo obrigatório`,
          'string.empty': `"productId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(validateDTO('body', {
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
      })),
      asyncMiddleware(productsController.editProductCTRL)
    )
    .delete(
      asyncMiddleware(authMiddleware.actionAuth('DELETE_PRODUCT')),
      asyncMiddleware(validateDTO('params', {
        supplierId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"supplierId" é um campo obrigatório`,
          'string.empty': `"supplierId" não deve ser vazio`,
        }),
        productId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"productId" é um campo obrigatório`,
          'string.empty': `"productId" não deve ser vazio`,
        })
      })),
      asyncMiddleware(productsController.deleteProductCTRL)
    )

};
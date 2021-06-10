const productsService = require('../services/products.service');

module.exports = {

  CreateProductCTRL: async ( req, res, next ) => {
    const { body, params } = req;

    const serviceResult = await productsService.createProduct({
      ...params,
      ...body
    });

    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { data: serviceResult.data } : { default: serviceResult.default };

    return res.status(statusCodeReturn).send(dataReturn);
  },

  editProductCTRL: async ( req, res, next ) => {

  },
  
  deleteProductCTRL: async ( req, res, next ) => {

  },

  getAllProductCTRL: async ( req, res, next ) => {

  },

  getProductByIdCTRL: async ( req, res, next ) => {

  },


  activateProductCTRL: ( req, res, next ) => {

  },

  deactivateProductCTRL: ( req, res, next ) => {

  },


}
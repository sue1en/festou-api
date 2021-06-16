const productsService = require('../services/products.service');

module.exports = {

  CreateProductCTRL: async ( req, res, next ) => {
    const { body, params } = req;

    const serviceResult = await productsService.createProduct({
      ...params,
      ...body
    });
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { data: serviceResult.data } : { details: serviceResult.details };
    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },
  
  editProductCTRL: async ( req, res, next ) => {
    const { supplierId, productId } = req.params;
    const serviceResult = await productsService.editProduct({
      supplierId: supplierId, productId: productId, userId: req.user.id, model: req.body });
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { messege:serviceResult.message, data: serviceResult.data } : { details: serviceResult.details };
    return res.status(statusCodeReturn).send(dataReturn);
    
  },
  
  deleteProductCTRL: async ( req, res, next ) => {
    const { supplierId, productId } = req.params;
    const serviceResult = await productsService.deleteProduct({
      supplierId: supplierId, productId: productId, userId: req.user.id
    });
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { messege:serviceResult.message, data: serviceResult.data } : { details: serviceResult.details };
    return res.status(statusCodeReturn).send(dataReturn);
  },

  getAllProductCTRL: async ( req, res, next ) => {
    const serviceResult = await productsService.getAllProduct()
    return res.status(200).send(serviceResult);
  },

  getProductByIdCTRL: async ( req, res, next ) => {
    const { params } = req;
    
    const serviceResult = await productsService.getProductById(params.productId)
    if(!serviceResult){
      return res.status(400).send({ details: ["produto não existe"]});
    }
    return res.status(200).send(serviceResult);
  },

  activateProductCTRL: ( req, res, next ) => {

  },

  deactivateProductCTRL: ( req, res, next ) => {

  },

}
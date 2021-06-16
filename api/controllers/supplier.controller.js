const supplierService = require('../services/supplier.service')

module.exports = {

  createSupplierCTRL: async (req, res, next) => {
    const { body } = req

    const serviceResult = await supplierService.createSupllier(body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  editSupplierCTRL: async (req, res, next) => {
    const { params, body } = req
    const serviceResult = await supplierService.editSupplier(params.supplierId, body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  deleteSupplierCTRL: async (req, res, next) => {
    const { params } = req
    const serviceResult = await supplierService.deleteSupplier(params.supplierId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {message: serviceResult.message} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    }); 
  },

  getAllSupplierCTRL: async (req, res, next) => {
    const serviceResult = await supplierService.getAllSupllier();
    return res.status(200).send({data: serviceResult})
  },

  getSupplierByIdCTRL: async (req, res, next) => {
    const { params } = req
    const serviceResult = await supplierService.getSupllierById(params.supplierId);
    if(!serviceResult){
      return res.status(400).send({ details: ["Fornecedor não existe"]});
    }
    return res.status(200).send({data:serviceResult});
  },

  activateSupplierCTRL: async (req, res, next) => {
    const { supplierId } = req.params;
    const serviceResult = await supplierService.changeSupplierStatus(supplierId, 'Ativa');

    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.datails};

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },
  
  deactivateSupplierCTRL: async (req, res, next) => {
    const { supplierId } = req.params;
    const serviceResult = await supplierService.changeSupplierStatus(supplierId, 'Inativa');
  
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.datails};
  
    return res.status(statusCodeReturn).send({
      message: "Operação realizada com sucesso.",
      ...dataReturn
    })
  },

  //products by supplier:
  getProductsBySupplierCTRL: async ( req, res, next ) => {
    const { params } = req;

    const data = await supplierService.getProductsBySupplier(params.supplierId);

    return res.status(200).send({
      data,
    })
  }


}
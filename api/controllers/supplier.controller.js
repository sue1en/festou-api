const supplierService = require('../services/supplier.service')

module.exports = {

  createSupplierCTRL: async (req, res, next) => {
    const { body } = req

    const serviceResult = await supplierService.createSupplier(body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  editSupplierCTRL: async (req, res, next) => {
    const { params, body, user } = req
    const serviceResult = await supplierService.editSupplier({
      ...params,
      ...body,
      authSupplier: user.id,
    });
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  deleteSupplierCTRL: async (req, res, next) => {
    const { params } = req
   
    const serviceResult = await supplierService.deleteSupplier(params.supplierId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    }); 
  },

  getAllSupplierCTRL: async (req, res, next) => {
    const serviceResult = await supplierService.getAllSupplier();
    const stautusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data:serviceResult.data} : {details: serviceResult.datails}
    
    return res.status(stautusCodeReturn).send({message: serviceResult.message, ...dataReturn})
  },

  getSupplierByIdCTRL: async (req, res, next) => {
    const { params } = req
    const serviceResult = await supplierService.getSupplierById(params.supplierId);
    
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { data: serviceResult.data } : {detail: serviceResult.details};

    return res.status(statusCodeReturn).send({message:serviceResult.message, ...dataReturn});
  },

  activateSupplierCTRL: async (req, res, next) => {
    const { supplierId } = req.params;
    const serviceResult = await supplierService.changeSupplierStatus(supplierId, 'Ativo');

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
      message: serviceResult.message,
      ...dataReturn
    })
  },

  denieSupplierCTRL: async (req, res, next) => {
    const { supplierId } = req.params;
    const serviceResult = await supplierService.changeSupplierStatus(supplierId, 'Recusado');
  
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details: serviceResult.datails};
  
    return res.status(statusCodeReturn).send({
      message: serviceResult.message, 
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
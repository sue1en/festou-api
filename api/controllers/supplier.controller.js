const supplierService = require('../services/supplier.service')

module.exports = {

  createSupplierCTRL: async (req, res, next) => {
    const { body } = req
    const serviceResult = await supplierService.createSupllier(body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details: serviceResult.datails}

    return res.status(statusCodeReturn).send(dataReturn)
  },

  editSupplierCTRL: async (req, res, next) => {
    const { params, body } = req
    const serviceResult = await supplierService.editSupllier(params.supplierId, body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details: serviceResult.datails}

    return res.status(statusCodeReturn).send(dataReturn)
  },

  deleteSupplierCTRL: async (req, res, next) => {
    const { params } = req
    const serviceResult = await supplierService.deleteSupllier(params.supplierId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details: serviceResult.datails}

    return res.status(statusCodeReturn).send(dataReturn)
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

      

  },

  deactivateSupplierCTRL: async (req, res, next) => {
  },

}
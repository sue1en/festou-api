const categoryService = require('../services/categorie.service');

module.exports = {

  createCategoryCTRL: async (req, res, next) => {
    const { body } = req;
    
    const serviceResult = await categoryService.createCategory(body);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send(dataReturn);
  },

  editCategoryCTRL: async (req, res, next) => {
  },

  deleteCategoryCTRL: async (req, res, next) => {  
  },

  getAllCategoryCTRL: async (req, res, next) => {
    const serviceResult = await categoryService.getAll();
    return res.status(200).send({data: serviceResult});
  },

  getByIdCategoryCTRL: async (req, res, next) => {
  },


}
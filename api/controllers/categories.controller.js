const categoriesService = require('../services/categories.service');

module.exports = {

  createCategoriesCTRL: async (req, res, next) => {
    const { body } = req;
    
    const serviceResult = await categoriesService.createCategory(body);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send(dataReturn);
  },

  editCategoriesCTRL: async (req, res, next) => {
    const { params, body } = req;
    const serviceResult = await categoriesService.editCategories(params.categoryId, body);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send(dataReturn);
  },

  deleteCategoriesCTRL: async (req, res, next) => {  
    const { params } = req;
    const serviceResult = await categoriesService.deleteCategories(params.categoryId);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = statusCodeReturn.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send(dataReturn); 
  },

  getAllCategoriesCTRL: async (req, res, next) => {
    const serviceResult = await categoriesService.getAll();
    return res.status(200).send({data: serviceResult});
  },

  getCategoryByIdCTRL: async (req, res, next) => {
    const { params } = req;
    const serviceResult = await categoriesService.getById(params.categoryId);

    console.log("##########__serviceResult__##########")
    console.log(serviceResult)
    console.log("#####################################")
    
    if(!serviceResult){
      return res.status(400).send({
        details: [
          "Categoria informada não existe!"
        ]
      });
    }
    return res.status(200).send(serviceResult);
  },


}
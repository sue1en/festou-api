const categoriesService = require('../services/categories.service');

module.exports = {

  createCategoriesCTRL: async (req, res, next) => {
    const { body } = req;
    
    const serviceResult = await categoriesService.createCategory(body);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  editCategoriesCTRL: async (req, res, next) => {
    const { params, body } = req;
    const serviceResult = await categoriesService.editCategory(params.categoryId, body);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send({
      messege:serviceResult.message, ...dataReturn
    });
  },

  deleteCategoriesCTRL: async (req, res, next) => {  
    const { params } = req;
    const serviceResult = await categoriesService.deleteCategory(params.categoryId);

    const statusCodeReturn = serviceResult.success ? 200 : 400
    const dataReturn = serviceResult.success ? {message: serviceResult.message} : {details:serviceResult.details}

    return res.status(statusCodeReturn).send(dataReturn); 
  },

  getAllCategoriesCTRL: async (req, res, next) => {
    const serviceResult = await categoriesService.getAll();
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details:serviceResult.details};

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn});
  },

  getCategoryByIdCTRL: async (req, res, next) => {
    const { params } = req;
    const serviceResult = await categoriesService.getById(params.categoryId);

    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data: serviceResult.data} : {details:serviceResult.details};

    return res.status(statusCodeReturn).send(dataReturn);
  },

  //Produto
  getProductsByCategoryCTRL: async (req, res, next ) => {
    const { params } = req
    
    const serviceResult = await categoriesService.getProductsByCategory(params.categoryId);

    return res.status(200).send(serviceResult)
  }

}
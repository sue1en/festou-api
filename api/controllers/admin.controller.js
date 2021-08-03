const adminService = require('../services/admin.service');
const clientsService = require('../services/clients.service')

module.exports = {
  createAdminCTRL: async (req, res, next) => {
    const{ body } = req;
  
    const serviceResult = await adminService.createAdmin(body);
    
    const statusCodeReturn = serviceResult.success ? 200 : 401;
    const dataReturn = serviceResult.success ? { data:serviceResult.data} : {details:serviceResult.details};
  
    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  getAdminById: async ( req, res, next ) => {
    const { params } = req
    const serviceResult = await adminService.getAdminById(params.adminId);

    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? { data: serviceResult.data} : { details: serviceResult.details};

    return res.status(statusCodeReturn).send({ message:serviceResult.message, ...dataReturn});
  },

  getAllAdmin: async ( req, res, next ) => {
    const serviceResult = await adminService.getAllAdmin()
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data:serviceResult.data} : {details: serviceResult.details};

    return res.status(statusCodeReturn).send({message:serviceResult.message, ...dataReturn})
  },
}
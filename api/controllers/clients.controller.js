const clientsService = require('../services/clients.service')


module.exports = {

  createClientsCTRL: async (req, res, next ) => {
    const { body } = req;

    const serviceResult = await clientsService.crateClient(body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  editClientsCTRL: async (req, res, next ) => {
    const { params, body } = req;

    const serviceResult = await clientsService.editClient(params.clientId, body);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  deleteClientsCTRL: async (req, res, next ) => {

  },

  getAllClientsCTRL: async (req, res, next ) => {
    const serviceResult = await clientsService.getAllClients()
    return res.status(200).send({data: serviceResult})
  },

  getClientsByIdCTRL: async (req, res, next ) => {
    const { params } = req;
    const serviceResult = await clientsService.getClientsById(params.clientId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

}
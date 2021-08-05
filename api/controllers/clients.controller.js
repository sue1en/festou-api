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
    const { params, body, user } = req;

    const serviceResult = await clientsService.editClient({
      ...params,
      ...body,
      authClient: user.id,
    });
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },
  
  deleteClientsCTRL: async (req, res, next ) => {
    const { params } = req;
  
    const serviceResult = await clientsService.deleteCliente(params.clientId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});
  
    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });

  },

  getAllClientsCTRL: async (req, res, next ) => {
    const serviceResult = await clientsService.getAllClients()
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? {data:serviceResult.data} : {details: serviceResult.details}

    return res.status(statusCodeReturn).send({message:serviceResult.message, ...dataReturn})
  },

  getClientsByIdCTRL: async (req, res, next ) => {
    const { params } = req;
    const serviceResult = await clientsService.getClientsById(params.clientId);
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  activateClientCTRL: async (req, res, next ) => {
    const { params } = req;
    const serviceResult = await clientsService.changeClientStatus(params.clientId, 'Ativo');
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

  deactivateClientCTRL: async (req, res, next ) => {
    const { params } = req;
    const serviceResult = await clientsService.changeClientStatus(params.clientId, 'Inativa');
    const statusCodeReturn = serviceResult.success ? 200 : 400;
    const dataReturn = serviceResult.success ? ({data: serviceResult.data}) : ({details: serviceResult.details});

    return res.status(statusCodeReturn).send({messege:serviceResult.message, ...dataReturn
    });
  },

}
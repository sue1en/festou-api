const { clients } = require('../models/index');
const { toListItemDTO, toDTO} = require('../mappers/client.mapper');
const { createHash } = require('../utils/cryptography.utils');
const { isEmailRegistered } = require('../services/user.service');

const crateClient = async (model) => {
  const  {email, password, ...content } = model;

  if(await isEmailRegistered(email)){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: [
        'Email informado já está cadastrado'
      ]
    }
  }


  const newClient = await clients.create({
    email,
    password: createHash(password),
    ...content,
    status: 'em análise'
  })

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {
      ...toListItemDTO(newClient)
    }
  }
}

const getAllClients = async (model) => {
  const clientsFromDB = await clients.find()



  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há clientes cadastrados']
    }
  }

  return clientsFromDB.map(clientsDB => {
    return toListItemDTO(clientsDB)
  })  
}

module.exports = {
  crateClient,
  getAllClients,
}
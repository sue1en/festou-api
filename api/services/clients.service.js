const { clients } = require('../models/index');
const { toListItemDTO, toDTO} = require('../mappers/client.mapper');
const fileUtils = require('../utils/file.utils')
const { createHash } = require('../utils/cryptography.utils');
const { isEmailRegistered } = require('../services/user.service');

const crateClient = async (model) => {
  const  {email, password, kind, image, ...content } = model;

  if(await isEmailRegistered(email)){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: [ 'Email informado já está cadastrado']
    }
  };
  const newClient = await clients.create({
    email,
    password: createHash(password),
    kind: 'client',
    ...content,
    status: true,
    image: {
      originalName:image.originalName,
      name:image.newName,
      type:image.type,
    }
  });
  fileUtils.move(image.originalPath, image.newPath);
  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {
      ...toListItemDTO(newClient)
    }
  }
}

const editClient = async (clientId, model) => {
  const clientsFromDB = await clients.findById(clientId)
  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há cliente cadastrado com o id informado']
    }
  };
  if(clientsFromDB.id !== clientId ){
    return {
      success: false,
      message: 'Operação não permitida',
      details: ['Id informado não pertence ao usuário']
    }
  };
  
  const { name, birthdate, address, state, city, phoneNumber, image } = model;

  clientsFromDB.name = name;
  clientsFromDB.birthdate = birthdate;
  clientsFromDB.address = address;
  clientsFromDB.state = state;
  clientsFromDB.city = city;
  clientsFromDB.phoneNumber = phoneNumber;

  if(image){
    fileUtils.remove('clients', clientsFromDB.image.name);
    fileUtils.move(image.originalPath, image.newPath);
    clientsFromDB.image = {
      originalName:image.originalName,
      name:image.newName,
      type:image.type,
    }
  }

  await clientsFromDB.save()
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {...toListItemDTO(clientsFromDB)}
  }
}


const getAllClients = async () => {
  const clientsFromDB = await clients.find({kind:'client'})
  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há clientes cadastrados']
    }
  }
  return clientsFromDB.map(clientsDB => {
    return toListItemDTO(clientsDB)
  });  
};

const getClientsById = async (clientId) => {
  const clientsFromDB = await clients.findById(clientId);
  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há cliente cadastrado com o id informado']
    }
  };
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {...toDTO(clientsFromDB)}
  }
}

const deleteCliente = async (clientId) => {
  const clientsFromDB = await clients.findById(clientId);
  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há cliente cadastrado com o id informado']
    }
  };
  if(clientsFromDB.id !== clientId ){
    return {
      success: false,
      message: 'Operação não permitida',
      details: ['Id informado não pertence ao usuário']
    }
  };

  const { image } = clientsFromDB;
  fileUtils.remove('clients', image.name);

  await clients.deleteOne({
    _id:clientId
  })
  
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {
      id: clientId,
      name: clientsFromDB.name
    }
  }
}

const changeClientStatus = async(clientId, status) => {
  const clientsFromDB = await clients.findById(clientId);
  if(!clientsFromDB){
    return {
      success: false,
      message: 'Não foi possível realizar operação',
      details: ['Não há cliente cadastrado com o id informado']
    }
  };
  clientsFromDB.status = status;
  await clientsFromDB.save()
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {...toDTO(clientsFromDB.toJSON())}
  }
}

module.exports = {
  crateClient,
  editClient,
  getAllClients,
  getClientsById,
  deleteCliente,
  changeClientStatus,
}
const { clients } = require('../models/index');
const { toListItemDTO, toDTO} = require('../mappers/client.mapper');
const fileUtils = require('../utils/file.utils')
const { createHash } = require('../utils/cryptography.utils');
const { isEmailRegistered } = require('../services/user.service');
const BusinessRuleError = require('../utils/errors/error-business-rule');
const NotAuthorizedUserError = require('../utils/errors/error-not-authorized-user')

const crateClient = async (model) => {
  const  {email, password, kind, image, ...content } = model;

  if(await isEmailRegistered(email)){
    throw new BusinessRuleError('The email address you have entered was already registered')
  };
  const newClient = await clients.create({
    email,
    password: createHash(password),
    kind: 'client',
    ...content,
    status: 'Ativo',
    image: {
      originalName:image.originalName,
      name:image.newName,
      type:image.type,
    }
  });
  fileUtils.move(image.originalPath, image.newPath);
  return {
    success: true,
    message: 'The account has been successfully created.',
    data: {
      ...toListItemDTO(newClient)
    }
  }
}

const editClient = async (model) => {
  const clientsFromDB = await clients.findById(model.clientId)
  if(!clientsFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  };

  if(await model.clientId !== model.authClient){
    throw new NotAuthorizedUserError()
  };
  
  const { name, birthdate, address, uf, city, phoneNumber, image } = model;

  clientsFromDB.name = name;
  clientsFromDB.birthdate = birthdate;
  clientsFromDB.address = address;
  clientsFromDB.uf = uf;
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
};


const getAllClients = async () => {
  const clientsFromDB = await clients.find({kind:'client'})
  if(clientsFromDB.length <= 0) {
    throw new BusinessRuleError("There is no Client registered yet.")
  }
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: clientsFromDB.map(clientsDB => {
      return toListItemDTO(clientsDB)
    }),
  }
};

const getClientsById = async (clientId) => {
  const clientsFromDB = await clients.findById(clientId);
  if(!clientsFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  };
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {...toListItemDTO(clientsFromDB)}
  }
}

const deleteCliente = async (clientId) => {
  const clientsFromDB = await clients.findById({_id:clientId});
  if(!clientsFromDB){
    throw new BusinessRuleError("there's no client with the informed ID")
  };
  
  const { image } = clientsFromDB;
  if (image){
    fileUtils.remove('clients', image.name);
  }

  await clients.deleteOne({
    _id:clientId
  })
  
  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: `The client ${clientsFromDB.name} with de id ${clientsFromDB.id}, has been deleted`
  }
}

const changeClientStatus = async(clientId, status) => {
  const clientsFromDB = await clients.findById(clientId);
  if(!clientsFromDB){
    throw new BusinessRuleError("there's no client with the informed ID")
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
const { supplier } = require('../models/index');
const { toListItemDTO, toDTO } = require('../mappers/supplier.mapper');
const fileUtils = require('../utils/file.utils');
const { isEmailRegistered } = require('./user.service');
const { createHash } = require('../utils/cryptography.utils');

const isCnpjRegistered = async (cnpj) =>{
  const resultFromDB = await supplier.find({ cnpj });
  return resultFromDB.length > 0 ? true : false;
};

const createSupllier = async(model) => {
  const { email, cnpj, password, ...resto} = model;

  if(await isEmailRegistered(email)){
    return{
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Email informado já está cadastrado'],
    }
  };

  if(await isCnpjRegistered(cnpj)){
    return{
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Cnpj informado já está cadastrado'],
    }
  };

  const newSupplier = await supplier.create({
    email,
    cnpj,
    ...resto,
    password: createHash(password),
    status: 'Em analise'
  });

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data:{
      ...toListItemDTO(newSupplier)
    } 
  }
};

const getAllSupllier = async () => {
  const supplierFromDB = await supplier.find();
  return supplierFromDB.map(supplierDB => {
    return toListItemDTO(supplierDB);
  });
}

const getSupllierById = async(supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId)

  if(supplierFromDB){
    return toListItemDTO(supplierFromDB);
  };
  return; 
};

const editSupplier = async(supplierId, model) => {
  const supplierFromDB = await supplier.findById(supplierId)
  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Não existe fornecedor cadastrado para o id informado'],
    }
  }

  const { cnpj, tradeName, address, state, city, phoneNumber } = model

  supplierFromDB.cnpj = cnpj;
  supplierFromDB.tradeName = tradeName;
  supplierFromDB.address = address;
  supplierFromDB.state = state;
  supplierFromDB.city = city;
  supplierFromDB.phoneNumber = phoneNumber;

  await supplierFromDB.save()

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {...toDTO(supplierFromDB)}
  }
};

const deleteSupplier = async(supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId)
  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Não existe fornecedor cadastrado para o id informado'],
    }
  }

  await supplier.deleteOne({
    _id:supplierId
  })

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
  }
};

const changeSupplierStatus = async(suppliersId, status) => {
  const supplierFromDB = await supplier.findById(suppliersId);
  if (!supplierFromDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: [
        'Não existe fornecedor cadastrado para o id informado'
      ],
    }
  }

  supplierFromDB.status = status;
  await supplierFromDB.save();
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {
      ...toListItemDTO(supplierFromDB.toJSON())
    }
  }
};


module.exports = {
  createSupllier,
  getAllSupllier,
  getSupllierById,
  editSupplier,
  deleteSupplier,
  changeSupplierStatus,
}
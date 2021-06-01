const { supplier } = require('../models/index');
const supplierMapper = require('../mappers/supplier.mapper');
const fileUtils = require('../utils/file.utils');
const { isEmailRegistered } = require('./user.service');
const { createHash } = require('../utils/cryptography.utils');

const isCnpjRegistered = async (cnpj) =>{
  const resultFromDB = await supplier.find({ cnpj });
  return resultFromDB.length > 0 ? true : false;
};

const createSupllier = async(model) => {
  const { email, cnpj, password, ...resto} = model;

  if(isEmailRegistered){
    return{
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Email informado já está cadastrado'],
    }
  };

  if(isCnpjRegistered){
    return{
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Email informado já está cadastrado'],
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
    return supplierMapper.toItemListDTO(supplierDB);
  });
}

const getSupllierById = async() => {
};

const editSupllier = async() => {
};

const deleteSupllier = async() => {
};

const changeSupplierStatus = async(suppliersId, status) => {
  const resultFromDB = await supplier.findById(suppliersId);
  if (!resultFromDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: [
        'Não existe fornecedor cadastrado para o id cadastrado'
      ],
    }
  }

  resultFromDB.status = status;
  await resultFromDB.save();
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {
      ...toItemListDTO(resultFromDB.toJSON())
    }
  }
};


module.exports = {
  createSupllier,
  getAllSupllier,
  getSupllierById,
  editSupllier,
  deleteSupllier,
  changeSupplierStatus,
}
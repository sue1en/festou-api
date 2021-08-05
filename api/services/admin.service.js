const { admin } = require('../models/index');
const { toUserDTO } = require('../mappers/user.mapper');
const { toListItemDTO } = require('../mappers/admin.mapper')
const { createHash } = require('../utils/cryptography.utils');
const { isEmailRegistered } = require('./user.service');
const BusinessRuleError = require('../utils/errors/error-business-rule');

const createAdmin = async(model, adminId) => {
  const { email, password, ...content } = model
  
  if(await isEmailRegistered(email)){
    return {
      success:false,
      message: 'Operação não podde ser realizada.',
      detail: ['Email informado já está cadastrado']
    }
  }
  
  const newAdmin = await admin.create({
    email,
    password: createHash(password),
    ...content,
    status: true,
  })
  
  return {
    success:true,
    message: 'Operação realizada com sucesso.',
    data: {
      ...toUserDTO(newAdmin)
    }
  }
}

const getAdminById = async(adminId) => {
  const adminFromDB = await admin.findById(adminId);
  if(!adminFromDB){
    throw new BusinessRuleError("there's no admin with the informed ID")
  }
  
  return {
    success: true,
    message: 'operação realaizada com sucesso!',
    data: {...toListItemDTO(adminFromDB)}
  }
}

const getAllAdmin = async() => {
  const adminFromDB = await admin.find({kind:'admin'})
  if(adminFromDB.length <= 0){
    throw new BusinessRuleError("Ops!! There is no Admin registered.")
  }
  return {
    success: true,
    message: 'operação realaizada com sucesso!',
    data: adminFromDB.map(adminDB => {
      return toListItemDTO(adminDB);
    })
  }
}

module.exports = {
  createAdmin,
  getAdminById,
  getAllAdmin,
}
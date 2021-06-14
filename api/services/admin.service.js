const { admin } = require('../models/index');
const { toUserDTO } = require('../mappers/user.mapper');
const { createHash } = require('../utils/cryptography.utils');
const { isEmailRegistered } = require('./user.service');

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

module.exports = {
  createAdmin,
}
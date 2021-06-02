const { user } = require('../models/index');
const cryptography = require('../utils/cryptography.utils');
const userMapper = require('../mappers/user.mapper');
const md5 = require('md5');

const isEmailRegistered = async (email) => {
  const resultFromDB = await user.find({ email });
  return resultFromDB.length > 0 ? true : false
};

const userValidate = async (email, password) => {
  return await user.findOne({ email, senha: cryptography.createHash(password)}) ? true : false
};

const createCredential = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });

  const userDTO = userMapper.toUserDTO(userDB);

  return {
    token: cryptography.criaToken(userDTO),
    userDTO,  
  };
};

const authUser = async (email, password) => {
  const resultFromDB = await userValidate(email, password);

  if(!resultFromDB){
    return {
      success: false,
      message: "não foi possível autenticar o usuário",
      details: [
        "usuário ou senha inválido",
      ],
    }
  }

  return {
    success: true,
    message: "usuário autenticado com sucesso",
    details: await createCredential(email) 
  }
}

const createUser = async () => {
  const newUser = await user.create({
    email: model.email,
    senha: md5(`123456${process.env.MD5_SECRET}`)
  });
}

module.exports = {
  authUser, 
  createUser,
  isEmailRegistered,
}
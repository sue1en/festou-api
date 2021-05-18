const { user } = require('../models/index');
const cryptography = require('../utils/cryptography.utils');
const userMapper = require('../mappers/user.mapper');

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
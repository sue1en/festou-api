const { user } = require('../models/index');
const cryptography = require('../utils/cryptography.utils');
const userMapper = require('../mappers/user.mapper');

const profiles = [
  {
    id:'1',
    description:'admin',
    actions:[
      'CREATE_CATEGORY',
      'EDIT_CATEGORY',
      'ACTIVATE_CATEGORY',
      'DEACTIVATE_CATEGORY',
      'DELETE_CATEGORY',
      'ACTIVATE_SUPPLIER',
      'DEACTIVATE_SUPPLIER',
      'DELETE_PRODUCT',
      'ACTIVATE_PRODUCT',
      'DEACTIVATE_PRODUCT',
      'ACTIVATE_CLIENT',
      'DEACTIVATE_CLIENT',
      'DELETE_CLIENT',
      'GET_ALL_CLIENTS',
      'GET_BY_ID_CLIENT',
    ]
  },
  {
    id:'2',
    description:'supplier',
    actions:[
      'EDIT_SUPPLIER',
      'DEACTIVATE_SUPPLIER',
      'CREATE_PRODUCT',
      'EDIT_PRODUCT',
      'ACTIVATE_PRODUCT',
      'DEACTIVATE_PRODUCT',
      'DELETE_PRODUCT',
      'GET_BY_ID_CLIENT',
    ]
  },
  {
    id:'3',
    description:'client',
    actions:[
      'EDIT_CLIENT',
      'DELETE_CLIENT',
      'GET_BY_ID_CLIENT',
    ]
  }
]

const isEmailRegistered = async (email) => {
  const resultFromDB = await user.find({ email });
  return resultFromDB.length > 0 ? true : false
};

const userValidate = async (email, password) => {
  return await user.findOne({ email, password: cryptography.createHash(password)}) ? true : false
};

const createCredential = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });
  
  const userDTO = userMapper.toUserDTO(userDB);
  return {
    token: cryptography.createToken(userDTO),
    userDTO,  
  };
};

const authUserService = async (email, password) => {
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
    data: await createCredential(email) 
  }
};

const findProfileById = async(profileId) => {
  const result = await profiles.find(item => Number(item.id) === Number(profileId));
  return result; 
};

const validateProfileActions = async (profileId, actions) => {
  const profile = await findProfileById(profileId);
  return profile.actions.includes(actions);
}


module.exports = {
  authUserService, 
  isEmailRegistered,
  findProfileById,
  validateProfileActions,
}
const { user } = require('../models/index');
const cryptography = require('../utils/cryptography.utils');
const userMapper = require('../mappers/user.mapper');
const NotAuthenticatedUserError = require('../utils/errors/error-not-authenticated-user');


const profiles = [
  {
    id: 1,
    description:'admin',
    actions:[
      'CREATE_CATEGORY',
      'EDIT_CATEGORY',
      'ACTIVATE_CATEGORY',
      'DEACTIVATE_CATEGORY',
      'DELETE_CATEGORY',
      'DELETE_SUPPLIER',
      'DENIE_SUPPLIER',
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
    id: 2,
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
    id: 3,
    description:'client',
    actions:[
      'EDIT_CLIENT',
      'GET_BY_ID_CLIENT',
    ]
  },
];

const findProfileById = async(profileId) => {
  const result = await profiles.find(item => Number(item.id) === Number(profileId));
  return result; 
};

const supplierUserValidate = async (user) => {
  if (!user)
    return false;

  if (user.kind === 'supplier')
    return user.status === 'active' ? true : false;
  
  return true;
};

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
    throw new NotAuthenticatedUserError('User or password incorrect')
  };
  
  if(!(await supplierUserValidate(resultFromDB))){
    throw new NotAuthenticatedUserError('User or password incorrect')
  };

  return {
    success: true,
    message: "Successfully authenticated",
    data: await createCredential(email) 
  }
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
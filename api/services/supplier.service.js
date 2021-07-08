const { products, categories, supplier } = require('../models/index');
const productsMapper = require('../mappers/product.mapper');
const { toListItemDTO, toDTO } = require('../mappers/supplier.mapper');
const fileUtils = require('../utils/file.utils');
const { isEmailRegistered } = require('./user.service');
const { createHash } = require('../utils/cryptography.utils');
const BusinessRuleError = require('../utils/errors/error-business-rule');

const isCnpjRegistered = async (cnpj) =>{
  const resultFromDB = await supplier.find({ cnpj });
  return resultFromDB.length > 0 ? true : false;
};

const createSupplier = async(model) => {
  const { email, cnpj, password, kind, image, ...content} = model;

  if(await isEmailRegistered(email)){
    throw new BusinessRuleError('The email address you have entered is already registered')
  };
  
  if(await isCnpjRegistered(cnpj)){
    throw new BusinessRuleError('The Cnpj you have entered is already registered')
  };
  
  const newSupplier = await supplier.create({
    email,
    cnpj,
    ...content,
    password: createHash(password),
    kind:'supplier',
    status: 'Em analise',
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
    data:{ ...toListItemDTO(newSupplier)} 
  }
};

//TODO *curtidas
const getAllSupplier = async () => {
  const supplierFromDB = await supplier.find({kind:'supplier'});
  return supplierFromDB.map(supplierDB => {
    return toListItemDTO(supplierDB);
  });
}

//TODO error
const getSupplierById = async(supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId)
  if(supplierFromDB){
    return toListItemDTO(supplierFromDB);
  };
  return; 
};
//TODO error
const editSupplier = async(supplierId, model) => {
  const supplierFromDB = await supplier.findById(supplierId)
  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Não existe fornecedor cadastrado para o id informado'],
    }
  }
  if(supplierId !== supplierFromDB.id){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Usuário não autorizado.'],
    }
  }

  const { cnpj, tradeName, description, address, state, city, phoneNumber, image } = model
  
  supplierFromDB.cnpj = cnpj;
  supplierFromDB.tradeName = tradeName;
  supplierFromDB.description = description;
  supplierFromDB.address = address;
  supplierFromDB.state = state;
  supplierFromDB.city = city;
  supplierFromDB.phoneNumber = phoneNumber;
  
  if(image){
    fileUtils.remove('supplier', supplierFromDB.image.name);
    fileUtils.move(image.originalPath, image.newPath);
    supplierFromDB.image = {
      originalName:image.originalName,
      name:image.newName,
      type:image.type,
    }
  }
  
  await supplierFromDB.save()
  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {...toDTO(supplierFromDB)}
  }
};

const deleteSupplier = async (supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId)

  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Não existe fornecedor cadastrado para o id informado'],
    }
  }
  
  const { image } = supplierFromDB;
  fileUtils.remove('supplier', image.name);

  await supplier.deleteOne({
    _id:supplierId
  })
  
  return {
    success: true,
    message: 'Operação realizada com sucesso.'
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

const getProductsBySupplier = async (supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId).populate('products');
  const supplierAsJSON = supplierFromDB.toJSON();
  return supplierAsJSON.products.map(item => {
    return productsMapper.toListItemDTO(item);
  })
};

module.exports = {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  editSupplier,
  deleteSupplier,
  changeSupplierStatus,
  getProductsBySupplier,
}

  // console.log('##########__email__##########')
  // console.log(await isEmailRegistered(email))
  // console.log('############################')
  
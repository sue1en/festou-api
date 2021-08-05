const { products, categories, supplier } = require('../models/index');
const productsMapper = require('../mappers/product.mapper');
const { toListItemDTO, toDTO } = require('../mappers/supplier.mapper');
const fileUtils = require('../utils/file.utils');
const { isEmailRegistered } = require('./user.service');
const { createHash } = require('../utils/cryptography.utils');
const emailUtils = require('../utils/email.utils');
const BusinessRuleError = require('../utils/errors/error-business-rule');
const NotAuthorizedUserError = require('../utils/errors/error-not-authorized-user')

const isCnpjRegistered = async (cnpj) =>{
  const resultFromDB = await supplier.find({ cnpj });
  return resultFromDB.length > 0 ? true : false;
};

const createSupplier = async(model) => {
  const { email, cnpj, password, kind, image, ...content} = model;

  if(await isEmailRegistered(email)){
    throw new BusinessRuleError('The email address you have entered was already registered')
  };
  
  if(await isCnpjRegistered(cnpj)){
    throw new BusinessRuleError('The Cnpj you have entered was already registered')
  };
  
  const newSupplier = await supplier.create({
    email,
    cnpj,
    ...content,
    password: createHash(password),
    kind:'supplier',
    status: 'Em análise', // Em análise | Ativo | Inativo
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
  if(supplierFromDB.length <= 0) {
    throw new BusinessRuleError("There is no Supplier registered yet.")
  }
  return {
    success: true,
    message: 'Operação realizada com sucesso!',
    data: supplierFromDB.map(supplierDB => {
        return toListItemDTO(supplierDB);
      })
  }
};

//TODO error
const getSupplierById = async(supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId); 
  if(!supplierFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  };
  return {
    success: true,
    message: 'operação realaizada com sucesso!',
    data: toListItemDTO(supplierFromDB),
  }
};

const editSupplier = async(model) => {
  const supplierFromDB = await supplier.findById(model.supplierId)
  if(!supplierFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  }

  if(await model.supplierId !== model.authSupplier){
    throw new NotAuthorizedUserError()
  }

  const { cnpj, tradeName, description, address, uf, city, phoneNumber, image } = model
  
  supplierFromDB.cnpj = cnpj;
  supplierFromDB.tradeName = tradeName;
  supplierFromDB.description = description;
  supplierFromDB.address = address;
  supplierFromDB.uf = uf;
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
    data: toListItemDTO(supplierFromDB),
  }
};

const deleteSupplier = async (supplierId) => {
  const supplierFromDB = await supplier.findById(supplierId);

  if(!supplierFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  }
  
  const { image } = supplierFromDB;
  fileUtils.remove('supplier', image.name);

  await supplier.deleteOne({
    _id:supplierId
  })
  
  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: `The supplier ${supplierFromDB.tradeName} with de id ${supplierFromDB.id}, has been deleted`
  }
};

// const newSupplierStatus = async(supplierId, status) => {
//   const supplierFromDB = await supplier.findById(supplierId);
//   if(!supplierFromDB){
//     throw new BusinessRuleError("there's no supplier with the informed ID")
//   };

//   supplierFromDB.status = status;
//   await supplierFromDB.save();

//   if(status === "Ativo") {
//     emailUtils.sendEmail({
//       addressee: supplierFromDB.email,
//       sender: process.env.SENDGRID_SENDER,
//       subject: `Account registration reply | ${supplierFromDB.tradeName}`,
//       body: `Your account has been confirmed.`,
//     })
//   }

//   return {
//     success: true,
//     message:"Success!!!",
//     data:{
//       ...toListItemDTO(supplierFromDB.toJSON())
//     }
//   }
// };

//altera ativo inativo
const changeSupplierStatus = async(supplierId, status) => {
  const supplierFromDB = await supplier.findById(supplierId);
  if(!supplierFromDB){
    throw new BusinessRuleError("there's no supplier with the informed ID")
  };

  supplierFromDB.status = status;
  await supplierFromDB.save();

  if(status === "Ativo") {
    emailUtils.sendEmail({
      addressee: supplierFromDB.email,
      sender: process.env.SENDGRID_SENDER,
      subject: `Account registration reply | ${supplierFromDB.tradeName}`,
      body: `Your account has been confirmed.`,
    })
  }

  return {
    success: true,
    message:"Success!!!",
    data:{
      ...toListItemDTO(supplierFromDB.toJSON())
    }
  }
};

// const changeSupplierStatus = async(suppliersId, status) => {
//   const supplierFromDB = await supplier.findById(suppliersId);
//   if (!supplierFromDB) {
//     return {
//       success: false,
//       message: 'Operação não pode ser realizada.',
//       details: [
//         'Não existe fornecedor cadastrado para o id informado'
//       ],
//     }
//   }

//   supplierFromDB.status = status;
//   await supplierFromDB.save();
//   return {
//     success:true,
//     message: 'Operação realizada com sucesso.',
//     data: {
//       ...toListItemDTO(supplierFromDB.toJSON())
//     }
//   }
// };

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
  // newSupplierStatus,
};
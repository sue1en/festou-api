const { categories, products } = require('../models/index');
const categoriesMapper = require('../mappers/categories.mapper');
const productsMapper = require('../mappers/product.mapper');
const fileUtils = require('../utils/file.utils');
const BusinessRuleError = require('../utils/errors/error-business-rule');

const getAll = async () => {
  const categoriesFromDB = await categories.find();
  if(categoriesFromDB.length <= 0){
    throw new BusinessRuleError("Neither category were registered.")
  }
  return {
    success: true,
    message: 'Operação realizada com sucesso!',
    data: categoriesFromDB.map(categoryDB => {
        return categoriesMapper.toItemListDTO(categoryDB);
      })
  }
};

const getById = async(categoryId) => {
  const categoryFromDB = await categories.findById(categoryId);
  if(!categoryFromDB){
    throw new BusinessRuleError("there's no category with the informed ID")
  };

  return {
    success: true,
    message: 'Operação realizada com sucesso!',
    data: categoriesMapper.toDTO(categoryFromDB),
  };
};

const isNameRegistered = async (name) => {
  const categoryFromDB = await categories.find({ name });
  return categoryFromDB.length > 0 ? true : false;
}

const createCategory = async (model) => {
 const { name, description, status, image } = model;
  if(await isNameRegistered(name)){
    throw new BusinessRuleError('The name you have entered was already registered')
  };

  const newCategory = await categories.create({
    name: name,
    description: description,
    status: status,
    image: {
      originalName: image.originalName,
      name:image.newName,
      type:image.type,
    }
  });
 
  fileUtils.move(model.image.originalPath, model.image.newPath);
  return {
    success: true,
    message: 'cadastro realizados com sucesso',
    data: categoriesMapper.toDTO(newCategory)
  }
};

const editCategory = async (categoryId, model) => {
  const categoryFromDB = await categories.findOne({ _id:categoryId });

  if(!categoryFromDB){
    throw new BusinessRuleError("there's no category with the informed ID")
  };
  
  categoryFromDB.name = model.name;
  categoryFromDB.description = model.description;
  categoryFromDB.status = model.status;

  if ( typeof model.image === 'object' ){
    fileUtils.remove('categorias', categoryFromDB.image.name);
    categoryFromDB.image = {
      originalName:model.image.originalName,
      name:model.image.newName,
      type:model.image.type,
    }
    fileUtils.move(model.image.originalPath, model.image.newPath);
  }
  await categoryFromDB.save();

  return {
    success: true,
    message: 'Operação realizada com sucesso!',
    data: categoriesMapper.toDTO(categoryFromDB),
  }
};

const deleteCategory = async (categoryId) => {
  const categoryFromDB = await categories.findOne({ _id:categoryId });
  if(!categoryFromDB){
    throw new BusinessRuleError("there's no category with the informed ID")
  };
  const { image } = categoryFromDB;
  fileUtils.remove('categorias', image.name);

  await categories.deleteOne({
    _id: categoryId,
  });

  return {
    success: true,
    message: 'Operação realizada com sucesso!'
  }
};


//conferir essa
const getProductsByCategory = async (categoriesId) => {
  const categoryFromDB = await categories.findById(categoriesId).populate('products');
  const categoriesAsJSON = categoryFromDB.toJSON();
  return categoriesAsJSON.products.map(item => {
    return productsMapper.toListItemDTO(item);
  })
};


module.exports = {
  getAll,
  getById,
  createCategory,
  editCategory,
  deleteCategory,
  getProductsByCategory
}
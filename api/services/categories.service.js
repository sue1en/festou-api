const { categories, products } = require('../models/index');
const categoriesMapper = require('../mappers/categories.mapper');
const productsMapper = require('../mappers/product.mapper');
const fileUtils = require('../utils/file.utils');
const BusinessRuleError = require('../utils/errors/error-business-rule')

const getAll = async () => {
  const categoryFromDB = await categories.find();
  return categoryFromDB.map(categoryDB => {
    return categoriesMapper.toItemListDTO(categoryDB);
  });
};

const getById = async(categoryId) => {
  const categoryFromDB = await categories.findById(categoryId);

  if(categoryFromDB) {
    return categoriesMapper.toDTO(categoryFromDB);
  };
  return;
};

const createCategory = async (model) => {
  const newCategory = await categories.create({
    name: model.name,
    description: model.description,
    status: model.status,
    image: {
      originalName: model.image.originalName,
      name:model.image.newName,
      type:model.image.type,
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

  if (!categoryFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"categoriaID" não existe.']
    }
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
  if (!categoryFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"categoriaID" não existe.']
    }
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
const { categories } = require('../models/index');
const categoriesMapper = require('../mappers/categories.mapper');
const fileUtils = require('../utils/file.utils');

const getAll = async () => {
  const categoryFromDB = await categories.find();
  return categoryFromDB.map(categoryDB => {
    return categoriesMapper.toItemListDTO(categoryDB);
  });
}

const getById = async(categoryId) => {
  const categoryFromDB = await categories.findById(categoryId);

  if(categoryFromDB) {
    return categoriesMapper.toDTO(categoryFromDB);
  };
  return;
}

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
  })
  fileUtils.move(model.image.originalPath, model.image.newPath);
  return {
    success: true,
    message: 'cadastro realizados com sucesso',
    data: categoriesMapper.toDTO(newCategory)
  }
}

const editCategory = async (categoryId, model) => {
  const categoryFromDB = await categories.findOne({ _id:categoryId });

  if (!categoryFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"categoriaID" não existe.']
    }
  };

  fileUtils.remove('categorias', categoryFromDB.image.name);

  categoryFromDB.name = model.name;
  categoryFromDB.description = model.description;
  categoryFromDB.status = model.status;
  categoryFromDB.image = {
    originalName:model.image.originalName,
    name:model.image.newName,
    type:model.image.type,
  }

  await categoryFromDB.save();
  fileUtils.move(model.image.originalPath, model.image.newPath);

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
  // const { image } = categoryFromDB;
  fileUtils.remove('categorias', categoryFromDB.image.name);

  await categories.deleteOne({
    _id: categoryId,
  });

  return {
    success: true,
    message: 'Operação realizada com sucesso!'
  }
}

module.exports = {
  getAll,
  getById,
  createCategory,
  editCategory,
  deleteCategory
}
const { categories } = require('../models/index');
const categoriesMapper = require('../mappers/categories.mapper');
const fileUtils = require('../utils/file.utils');

const getAll = async () => {
  const CategoryFromDB = await categories.find();
  return CategoryFromDB.map(categoryDB => {
    return categoriesMapper.toItemListDTO(categoryDB);
  });
}

const getById = async(categoryId) => {
  const resultFromDB = await categories.findById(categoryId);
  if(resultFromDB) {
    return categoriesMapper.toDTO(resultFromDB);
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
  const resultFromDB = await categories.findOne({ _id:categoryId });

  if (!resultFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"categoriaID" não existe.']
    }
  };

  fileUtils.remove('categorias', resultFromDB.image.name);

  resultFromDB.name = model.name;
  resultFromDB.description = model.description;
  resultFromDB.status = model.status;
  resultFromDB.image = {
    originalName:model.image.originalName,
    name:model.image.newName,
    type:model.image.type,
  }

  await resultFromDB.save();
  fileUtils.move(model.image.originalPath, model.image.newPath);

  return {
    success: true,
    message: 'Operação realizada com sucesso!',
    data: categoriesMapper.toDTO(resultFromDB),
  }
};

const deleteCategory = async (categoryId) => {
  const resultFromDB = await categories.findOne({ _id:categoryId });
  if (!resultFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: ['"categoriaID" não existe.']
    }
  };
  // const { image } = resultFromDB;
  fileUtils.remove('categorias', resultFromDB.image.name);

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
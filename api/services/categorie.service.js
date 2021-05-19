const { category } = require('../models/index');
const categoryMapper = require('../mappers/categorie.mapper');
const fileUtils = require('../utils/file.utils');

const getAll = async () => {
  const listaCategoriasDB = await category.find({});
  return listaCategoriasDB.map(categoryDB => {
    return categoryMapper.toItemListDTO(categoryDB);
  });
}

const getById = async(categoriaID) => {
  const resultFromDB = await category.findById(categoriaID);
  if(resultFromDB) {
    return categoryMapper.toDTO(resultFromDB);
  };
  return;
}

const createCategory = async (model) => {
  const newCategory = await category.create({
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
    message: 'cadastro realizado com sucesso',
    data: categoryMapper.toDTO(newCategory)
  }
}


const deleteCategory = async (categoriaID) => {
  const resultFromDB = await category.findOne({ _id:categoriaID });

  if (!resultFromDB) { 
    return {
      success: false,
      message: 'não foi possível realizar a operação',
      details: [
        '"categoriaID" não existe.'
      ]
    }
  };

  const { image } = resultFromDB;
  fileUtils.remove('categorias', image.name);

  await category.remove({
    _id:categoriaID,
  });

  return {
    success: true,
    message: 'Operação realizada com sucesso!'
  }


}

module.exports = {
  createCategory,
  getAll,
  getById,
  deleteCategory
}
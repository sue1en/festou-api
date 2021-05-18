const { category } = require('../models/index');
const categoryMapper = require('../mappers/categorie.mapper');
const fileUtils = require('../utils/file.utils');

const listaTodos = async () => {
  const listaCategoriasDB = await category.find({});
  return listaCategoriasDB.map(categoryDB => {
    return categoryMapper.toDTO(categoryDB);
  });
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

module.exports = {
  createCategory,
  listaTodos,
}
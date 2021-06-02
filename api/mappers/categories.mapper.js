const fileUtils = require('../utils/file.utils');

const toDTO = (model) => {
  const { _id, name, description, status, image } = model;
 
  return {
    id:_id,
    name,
    description,
    status,
    image: fileUtils.createDownloadAddress('categorias', `${image.name}` || ''),
  }
}

const toItemListDTO = (model) => {
  const { _id, name, status, image } = model;
  return {
    id:_id,
    name,
    status,
    image: fileUtils.createDownloadAddress('categorias', `${image.name}` || ''),
  }
}

module.exports = {
  toDTO,
  toItemListDTO,
}
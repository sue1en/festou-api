const fileUtils = require('../utils/file.utils');


const toListItemDTO = (model) => {
  const { _id, name, price, status } = model;

  return {
    id: _id,
    name,
    price: `R$ ${price.toString().replace('.', ',')}`,
    status,
    // image: fileUtils.createDownloadAddress('products', `${image.name}` || ''),
  }
}

const toDTO = (model) => {
  const { _id, name, description, price, status, image } = model

  return {
    id: _id,
    name,
    description,
    price: `R$ ${price.toString().replace('.', ',')}`,
    status,
    // image: fileUtils.createDownloadAddress('products', `${image.name}` || ''),
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
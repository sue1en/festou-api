const fileUtils = require('../utils/file.utils');


const toListItemDTO = (model) => {
  const { _id, name, price, status, image, categories } = model;

  return {
    id: _id,
    name,
    price: `R$ ${price.toString().replace('.', ',')}`,
    status,
    image: fileUtils.createDownloadAddress('products', `${image.name}` || ''),
    categories,
  }
}

const toDTO = (model) => {
  const { _id, name, description, price, status, image, categories, supplier } = model

  return {
    id: _id,
    name,
    description,
    price: `R$ ${price.toString().replace('.', ',')}`,
    status,
    image: fileUtils.createDownloadAddress('products', `${image.name}` || ''),
    categories,
    supplier,
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
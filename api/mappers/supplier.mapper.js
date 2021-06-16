const fileUtils = require('../utils/file.utils');

// retorna algumas coisas
const toListItemDTO = (model) => {
  const { _id, email, cnpj, tradeName, description, kind, image, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    tradeName,
    description,
    kind,
    image: fileUtils.createDownloadAddress('supplier', `${image.name}` || ''),
    status,
  }
}

// retorna tudo
const toDTO = (model) => {
  const { _id, password, cratedAt, udatedAt, __v, kind, products, image, ...content } = model

  return {
    id: _id,
    image: fileUtils.createDownloadAddress('supplier', `${image.name}` || ''),
    ...content,  
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
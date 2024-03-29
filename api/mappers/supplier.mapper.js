const fileUtils = require('../utils/file.utils');

// retorna algumas coisas
const toListItemDTO = (model) => {
  const { _id, email, cnpj, tradeName, description, kind, image, address, uf, city, phoneNumber, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    tradeName,
    address,
    uf,
    city,
    phoneNumber,
    description,
    kind,
    image: fileUtils.createDownloadAddress('supplier', `${image.name}` || ''),
    status,
  }
}

// retorna tudo
const toDTO = (model) => {
  const { _id, likesSupplier, password, cratedAt, updatedAt, __v, kind, products, image, ...content } = model

  return {
    id: _id,
    image: fileUtils.createDownloadAddress('supplier', `${image.name}` || ''),
    likesSupplier: likesSupplier.map(item => {
      return {
        id: item._id,
        clientId: item.client._id,
        clientName: item.client.name,
      }
    }),
    ...content,  
  }
};

module.exports = {
  toListItemDTO,
  toDTO,
}
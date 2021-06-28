const fileUtils = require('../utils/file.utils');

const toListItemDTO = (model) => {
  const { _id, name, birthdate, address, city, uf,  phoneNumber, kind, status, image } = model;

  return {
    id: _id,
    name,
    birthdate,
    address,
    city,
    uf,
    phoneNumber,
    kind,
    status,
    image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

const toDTO = (model) => {
  const { _id, email, name, kind, status, image } = model;

  return {
    id: _id,
    email,
    name,
    kind,
    status,
    image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
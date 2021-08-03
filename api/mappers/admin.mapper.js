const fileUtils = require('../utils/file.utils');

const toListItemDTO = (model) => {
  const { _id, name, email, kind, status } = model;

  return {
    id: _id,
    name,
    email,
    kind,
    status,

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
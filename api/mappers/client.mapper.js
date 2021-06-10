const toListItemDTO = (model) => {
  const { _id, email, name, status } = model;

  return {
    id: _id,
    email,
    name,
    status,
    // image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

const toDTO = (model) => {
  return {
    ...model,  
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
const toListItemDTO = (model) => {
  const { _id, name, birthdate, address, city, state,  phoneNumber, status } = model;

  return {
    id: _id,
    name,
    birthdate,
    address,
    city,
    state,
    phoneNumber,
    status,
    // image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

const toDTO = (model) => {
  const { _id, email, name, status } = model;

  return {
    id: _id,
    email,
    name,
    status,
    // image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
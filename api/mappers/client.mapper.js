const toListItemDTO = (model) => {
  const { _id, name, birthdate, address, city, state,  phoneNumber, kind, status } = model;

  return {
    id: _id,
    name,
    birthdate,
    address,
    city,
    state,
    phoneNumber,
    kind,
    status,
    // image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

const toDTO = (model) => {
  const { _id, email, name, kind, status } = model;

  return {
    id: _id,
    email,
    name,
    kind,
    status,
    // image: fileUtils.createDownloadAddress('clients', `${image.name}` || ''),
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
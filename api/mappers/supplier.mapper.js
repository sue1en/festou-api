const toListItemDTO = (model) => {
  const { _id, cnpj, tradeName, status } = model;

  return {
    id: _id,
    cnpj,
    tradeName,
    status,
  }
}

const toDTO = (model) => {
  const { _id, cnpj, tradeName, address, state, city, phoneNumber } = model

  return {
    id: _id,
    cnpj,
    tradeName,
    address,
    state,
    city,
    phoneNumber
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
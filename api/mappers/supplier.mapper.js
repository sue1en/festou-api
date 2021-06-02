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
  return {

  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
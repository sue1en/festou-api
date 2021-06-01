const toListItemDTO = (model) => {
  const { _id, cnpj, nomeFantasia, status } = model;

  return {
    id: _id,
    cnpj,
    nomeFantasia,
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
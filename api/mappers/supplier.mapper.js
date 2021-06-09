const toListItemDTO = (model) => {
  const { _id, email, cnpj, tradeName, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    tradeName,
    status,
  }
}

const toDTO = (model) => {
  const { _id, password, cratedAt, udatedAt, __v, kind,products, ...content } = model

  return {
    id: _id,
    ...content,  
  }
}

module.exports = {
  toListItemDTO,
  toDTO,
}
// retorna algumas coisas
const toListItemDTO = (model) => {
  const { _id, email, cnpj, tradeName, image, status } = model;

  return {
    id: _id,
    email,
    cnpj,
    tradeName,
    image: fileUtils.createDownloadAddress('supplier', `${image.name}` || ''),
    status,
  }
}

// retorna tudo
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
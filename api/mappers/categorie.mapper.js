const toDTO = (model) => {
  const { _id, name, status, image } = model;
  return {
    id:_id,
    name,
    status,
    image: `/static/categories/${image.name}`
  }
}

module.exports = {
  toDTO,
}
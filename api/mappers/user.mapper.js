const manageUserType = (type) => {
  switch (type) {
    case 'admin':
      return 1;
    default:
      break;
  }
}

const toUserDTO = (model) => {
  const { id, email, kind, name, nomeFantasia } = model;

  console.log('nome: ', name);

  return {
    id,
    email,
    name: name ? name : nomeFantasia,
    userType: manageUserType(kind),
  }
}

module.exports = {
  toUserDTO,
}
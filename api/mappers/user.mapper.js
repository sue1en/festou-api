const manageUserType = (type) => {
  switch (type) {
    case 'admin':
      return 1;
    case 'supplier':
      return 2;
    case 'client':
      return 3;
    default:
      break;
  }
}

// const toUser2DTO = (model) => {
//   const { id, email, kind, name, tradeName } = model;

//   console.log('nome: ', name);

//   return {
//     id,
//     email,
//     name: name ? name : tradeName,
//     userType: manageUserType(kind),
//   }
// }

const toUserDTO = (model) => {
  const { id, email, kind } = model;
  return {
    id,
    email,
    kind: manageUserType(kind),
  }
}

module.exports = {
  toUserDTO,
  // toUser2DTO,
}
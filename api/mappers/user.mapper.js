const manageUserType = (kind) => {
  switch (kind) {
    case 'admin':
      return 1;
    case 'supplier':
      return 2;
    case 'client':
      return 3;
    default:
      break;
  }
};

const toUserDTO = (model) => {
  const { _id, email, kind, status } = model;
  return {
    id: _id,
    email,
    kind: manageUserType(kind),
    status,
  }
}

module.exports = {
  toUserDTO,
  // toUser2DTO,
}
const path = require('path');
const fs = require('fs');
const Uuid = require('uuid').v4;
const enderecoRaiz = process.env.FILE_BASE_PATH;

const createAdress = (destino, fileName) => {
  return path.join(enderecoRaiz, destino, fileName);
}

const createName = (type) => {
  const tipoTratado = type.split('/')[1];
  return `${Uuid()}.${tipoTratado}`;
}

const move = (temporario, definitivo) => {
  return fs.renameSync(temporario, definitivo);
}

module.exports = {
  createAdress,
  createName,
  move
}
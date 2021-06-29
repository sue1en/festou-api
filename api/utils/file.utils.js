const path = require('path');
const fs = require('fs');
const Uuid = require('uuid').v4;
const enderecoRaiz = process.env.FILE_BASE_PATH;

const root_dir = path.join(path.dirname(require.main.filename),'arquivos')

const createAddress = (destino, fileName = "" ) => {
  return path.join(root_dir, destino, fileName)
};

const createName = (type) => {
  const tipoTratado = type.split('/')[1];
  return `${Uuid()}.${tipoTratado}`;
}

const createDownloadAddress = (origem, fileName) => {
  return path.join('/static', origem, fileName);
}

const move = (temporario, definitivo) => {
  return fs.renameSync(temporario, definitivo);
}

const remove = (origem, arquivo) => {
  const fileAddress = createAddress(origem, arquivo)
  if(fs.existsSync(fileAddress)){
    fs.unlinkSync(fileAddress); 
  }
  return
}

module.exports = {
  createAddress,
  createName,
  move,
  createDownloadAddress,
  remove
}
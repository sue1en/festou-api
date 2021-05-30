const { fornecedor } = require('../models/index');
const fornecedorMapper = require('../mappers/categorie.mapper');
const fileUtils = require('../utils/file.utils');

const getAll = async () => {
  const fornecedorFromDB = await fornecedor.find();
  return fornecedorFromDB.map(FornecedorDB => {
    return fornecedorMapper.toItemListDTO(FornecedorDB);
  });
}



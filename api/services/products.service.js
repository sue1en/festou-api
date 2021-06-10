const { toListItemDTO, toDTO } = require('../mappers/product.mapper');
const fileUtils = require('../utils/file.utils')
const { products, categories, supplier } = require('../models');

const createProduct = async (model) => {
  const [ categoriesDB, supplierDB ] = await Promise.all([
    categories.findById(model.categoriesId),
    supplier.findById(model.supplierId),
  ]);

  if(!supplierDB){
    return {
      success: false,
      message: 'Operação não realizada.',
      details: [
        'Não existe fornecedor cadastrado para o fornecedor id informado.'
      ],
    };
  }
  if(!categoriesDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details:[
        'Não existe categoria cadastrada para o id informado.'
      ],
    };
  }

  // ainda preciso fazer a autenticação de usuário.

  const newProduct = await products.create({
    name:model.name,
    description:model.description,
    price:model.price,
    categories: model.categories,
    supplier: model.supplier,
    // image: {
    //   originalName:model.image.originalName,
    //   name:model.image.newName,
    //   type:model.image.type
    // },
  });

  categoriesDB.products = [...categoriesDB.products, newProduct._id];
  supplierDB.products = [...supplierDB.products, newProduct._id];

  await Promise.all([
    categoriesDB.save(),
    supplierDB.save(),
  ]);

  // fileUtils.move(model.image.originalPath, model.image.newPath);

  return {
    success: true,
    message: 'Cadastro realizado com sucesso.',
    data: {
      id: newProduct._id,
      name: newProduct.name,
    }
  }
};

const getAllProduct = async () => {
  const productsFromDB = await products.find();
  return productsFromDB.map(productsDB => {
    return toListItemDTO(productsDB)
  });
};


const getProductById = async (productId) => {
  const productsFromDB = await products.findById(productId);
  if(productsFromDB){
    return toListItemDTO(productsFromDB)
  }
  return 
}

const findByFilter = async () => {
  const mongoFilter = {};

}


module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
}
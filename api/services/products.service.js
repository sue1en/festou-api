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
    categories: model.categoriesId,
    supplier: model.supplierId,
    image: {
      originalName:model.image.originalName,
      name:model.image.newName,
      type:model.image.type
    },
  });

  categoriesDB.products = [...categoriesDB.products, newProduct._id];
  supplierDB.products = [...supplierDB.products, newProduct._id];

  await Promise.all([
    categoriesDB.save(),
    supplierDB.save(),
  ]);

  fileUtils.move(model.image.originalPath, model.image.newPath);

  return {
    success: true,
    message: 'Cadastro realizado com sucesso.',
    data: { ...toListItemDTO(newProduct)} 
  }
};

const getAllProduct = async () => {
  const productsFromDB = await products.find();
  return productsFromDB.map(productsDB => {
    return toDTO(productsDB)
  });
};


const getProductById = async (productId) => {
  const productsFromDB = await products.findById(productId);
  if(productsFromDB){
    return toDTO(productsFromDB)
  }
  return 
}

const findByFilter = async () => {
  const mongoFilter = {};

}

const editProduct = async ({ productId, supplierId, userId, model }) => {
  const [ productFromDB, supplierFromDB ] = await Promise.all([
    products.findById(productId),
    supplier.findById(supplierId),
  ]);

  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não realizada.',
      details: [
        'Fornecedor informado não existe.'
      ],
    };
  }
  if(supplierId !== userId){
    return {
      success: false,
      message: 'Operação não realizada.',
      details: [
        'Produto não pertence ao fornecedor informado.'
      ],
    };
  }
  if(!productFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details:[
        'Não existe produto cadastrado para o id informado.'
      ],
    }
  };
  
  if(productFromDB.supplier.toString() !== supplierId){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details:[
        'Fornecedor informado não é válido.'
      ],
    }
  };
  
  const { name, description, price, state, image } = model

  productFromDB.name = name
  productFromDB.description = description
  productFromDB.price = price
  productFromDB.state = state

  if(typeof image === 'object'){
    fileUtils.remove('products', productFromDB.image.name);
    fileUtils.move(image.originalPath, image.newPath);
    productFromDB.image = {
      originalName:image.originalName,
      name:image.newName,
      type:image.type,
    }
  }

  await productFromDB.save()
  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {...toDTO(productFromDB)}
  }
};

const deleteProduct = async ({ productId, supplierId, userId }) => {
  const [ productFromDB, supplierFromDB ] = await Promise.all([
    products.findById(productId),
    supplier.findById(supplierId),
  ]);

  if(!supplierFromDB){
    return {
      success: false,
      message: 'Operação não realizada.',
      details: [
        'Fornecedor informado não existe.'
      ],
    };
  }
  if(supplierId !== userId){
    return {
      success: false,
      message: 'Operação não realizada.',
      details: [
        'Produto não pertence ao fornecedor informado.'
      ],
    };
  }
  if(!productFromDB){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details:[
        'Não existe produto cadastrado para o id informado.'
      ],
    }
  };
  
  if(productFromDB.supplier.toString() !== supplierId){
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details:[
        'Fornecedor informado não é válido.'
      ],
    }
  };

  const categoryFromDB = await categories.findById(productFromDB.categories);
  categoryFromDB.products = categoryFromDB.products.filter(item => {
    return item.toString() !== productId
  });
  supplierFromDB.products = supplierFromDB.products.filter(item => {
    return item.toString() !== productId
  });

  const { image } = productFromDB;
  fileUtils.remove('products', image.name);

  await Promise.all([
    categoryFromDB.save(),
    supplierFromDB.save(),
    products.deleteOne(productFromDB)
  ])

  return {
    success: true,
    message: 'Operação realiada com sucesso',
    data: {
      id: productId,
      name: productFromDB.name
    }
  } 
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  editProduct,
  deleteProduct,
}
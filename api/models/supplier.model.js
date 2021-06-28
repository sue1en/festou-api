const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = {
  cnpj: {
    type: String,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {          // Analise | Ativo | Inativo
    type: String,
    required: true,
  },
  image: {
    originalName: {
      type:String,
      require: false,
    },
    name: {
      type:String,
      require: false,
    },
    type: {
      type:String,
      require: false,
    },
  },
  products:[{
    type:Schema.Types.ObjectId,
    ref: 'products'
  }]
}

module.exports = supplierSchema;
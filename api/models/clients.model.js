const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientsSchema = {
  name: {
    type: String,
    required: true,
  },
  birthdate: {
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
}

module.exports = clientsSchema;
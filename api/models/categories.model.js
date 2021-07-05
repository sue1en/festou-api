const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = {
  name: {
    type:String,
    require: true,
  },
  description: {
    type:String,
    require: false,
  },
  status: {
    type:Boolean,
    require: true,
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
module.exports = categoriesSchema
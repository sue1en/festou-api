const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = {
  name: {
    type:String,
    require: true,
  },
  description: {
    type:String,
    require: false,
  },
  price: {
    type:Number,
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
  categories:{
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  supplier:{
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
}
module.exports = productsSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  supplier: {
    type: Schema.Types.ObjectId,
    required:true,
    ref:'supplier',
  },
  client: {
    type: Schema.Types.ObjectId,
    required:true,
    ref:'client',
  },
}
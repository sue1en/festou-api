const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = {
  name: {
    type:String,
    require: true,
  },
};

module.exports = adminSchema;
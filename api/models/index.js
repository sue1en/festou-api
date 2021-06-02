const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {
  return new Schema({
    ...modelPai,
    ...model,
  }, {
    timestamps: true,
    collection: 'UsersCollection',
    ...options,
  })
}

const userSchema = require('./user.model');
const user = mongoose.model('user', createSchema(undefined, userSchema, {
  discriminatorKey: 'kind',
}));

const adminSchema = require('./admin.model');
const admin = mongoose.model('admin', createSchema(userSchema, adminSchema, {}));

const supplierSchema = require('./supplier.model');
const supplier = mongoose.model('supplier', createSchema(userSchema, supplierSchema, {}));

const categoriesSchema = require('./categories.model');
const categories = mongoose.model('categories', createSchema(undefined, categoriesSchema, {
  collection:'CategoriesCollection'
}));

module.exports = {
  user,
  admin,
  categories,
  supplier,
};
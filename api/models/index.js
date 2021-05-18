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

const userSchema = require('./user.models');
const user = mongoose.model('user', createSchema(undefined, userSchema, {
  discriminatorKey: 'kind',
}));

const adminSchema =require('./admin.models');
const admin = mongoose.model('admin', createSchema(userSchema, adminSchema, {}));

const categoriesSchema = require('./category.models');
const category = mongoose.model('categories', createSchema(undefined, categoriesSchema, {
  collection:'CategoriesCollection'
}));

module.exports = {
  user,
  admin,
  category
};
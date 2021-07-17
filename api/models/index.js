const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (mainModel, model, options = {}) => {
  return new Schema({
    ...mainModel,
    ...model,
  }, {
    timestamps: true,
    versionKey: false,
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

const clientsSchema = require('./clients.model');
const clients = mongoose.model('clients', createSchema(userSchema, clientsSchema, {}));

const categoriesSchema = require('./categories.model');
const categories = mongoose.model('categories', createSchema(undefined, categoriesSchema, {
  collection:'CategoriesCollection',
  toJSON: {
    virtuals: true,
  },
}));

const productsSchema = require('./products.model');
const products = mongoose.model('products', createSchema(undefined, productsSchema, {
  collection:'ProductsCollection',
  toJSON: {
    virtuals: true,
  }
}));

const suppliersLikesSchema = require('./suppliers-likes.model');
const suppliersLikes = mongoose.model('suppliersLikes', createSchema(undefined, suppliersLikesSchema, {
  collection: 'suppliersLikesCollection',
  toJSON: {
    virtuals:true,
  }
}));

module.exports = {
  user,
  admin,
  supplier,
  clients,
  categories,
  products,
  suppliersLikes,
};
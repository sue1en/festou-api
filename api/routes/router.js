const { Router } = require('express');
const { name, version } = require('../../package.json');

const usersRouterV1 = require('./v1/users');
const categoriesRouterV1 = require('./v1/categories');
const supplierRouterV1 = require('./v1/supplier');

module.exports = (appRouter) => {
  appRouter.get('/', (req, res, next) => {
    res.send(`${name} - Version:${version}`)
  });

  const routerV1 = Router();
  usersRouterV1(routerV1);
  categoriesRouterV1(routerV1);
  supplierRouterV1(routerV1);
  appRouter.use('/v1', routerV1);
}
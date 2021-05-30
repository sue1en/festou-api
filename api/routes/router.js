const { Router } = require('express');
const { name, version } = require('../../package.json');

const usersRouterV1 = require('./v1/users');
const categoriesRouterV1 = require('./v1/categories');
const forneceorRouterV1 = require('./v1/fornecedor');

module.exports = (appRouter) => {
  appRouter.get('/', (req, res, next) => {
    res.send(`${name} - Version:${version}`)
  });

  const routerV1 = Router();
  usersRouterV1(routerV1);
  categoriesRouterV1(routerV1);
  forneceorRouterV1(routerV1);
  appRouter.use('/v1', routerV1);
}
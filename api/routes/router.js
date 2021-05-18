const { Router } = require('express');
const { name, version } = require('../../package.json');

const usersRouterV1 = require('./v1/users');

module.exports = (appRouter) => {
  appRouter.get('/', (req, res, next) => {
    res.send(`${name} - Version:${version}`)
  });

  const routerV1 = Router();
  usersRouterV1(routerV1);
  appRouter.use('/v1', routerV2);
}
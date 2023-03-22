const express = require('express');
const { config } = require('../config/config');
const routerEntities = require('./entities.router');

function routerApi(app) {
  const router = express.Router();
  app.use(`/${config.env}/entity/v2.1`, router);

  router.use('/entities', routerEntities);
}

module.exports = routerApi;

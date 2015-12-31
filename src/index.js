'use strict';

var express = require('express');
var findAll = require('./findAll');
var find = require('./find');
var create = require('./create');
var param = require('./param');
var update = require('./update');
var destroy = require('./destroy');

function addAction(router, resource, action) {
  router[action.method](action.path,
    action.beforeAction.bind(this),
    actionPassThrough(resource, action.action),
    action.afterAction.bind(this));
}

function actionPassThrough(resource, fn) {
  return (req, res, next) => {
    fn(req, res, next, resource)
  }
}

function errorHandler(err, req, res, next) {
  res.status(500)
    .send(err)
    .end();
}

function paramPassThrough(resource, fn) {
  return (req, res, next, resourceId) => {
    fn(req, res, next, resourceId, resource);
  }
}

let defaultOptions = {
  actions: [
    find,
    findAll,
    create,
    update,
    destroy
  ],
  param,
  errorHandler
}

module.exports = function createJSDataRouter(resource, options) {
    options = Object.assign({}, defaultOptions, options)

    let router = express.Router();

    options.actions.map((action) => {
      addAction(router, resource, action);
    });

    router.param(':resourceId', paramPassThrough(resource, options.param));
    router.use(options.errorHandler);

    return router;
}

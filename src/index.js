'use strict';

var express = require('express');
var param = require('./param');

var findAll = require('./findAll');
var find = require('./find');
var create = require('./create');
var update = require('./update');
var destroy = require('./destroy');

var defaultOptions = {
  enabledActions:{
    findAll: true,
    find: true,
    create: true,
    update: true,
    destroy: true
  }
};

class JSDataRouter {

  constructor(resource, router, options) {
    options = Object.assign({}, defaultOptions, options);

    if(router === undefined) {
      router = express.Router(); 
    }

    this.router = router;
    this.resource = resource;
    this.router.param('resourceId', param.bind(this));

    if(options.enabledActions.findAll) {
      this.router.get('/',
        this.beforeFindAll.bind(this),
        this.findAll.bind(this),
        this.afterFindAll.bind(this));
    }

    if(options.enabledActions.find) {
      this.router.get('/:resourceId',
        this.beforeFind.bind(this),
        this.find.bind(this),
        this.afterFind.bind(this));
    }

    if(options.enabledActions.create) {
      this.router.post('/', 
        this.beforeCreate.bind(this),
        this.create.bind(this),
        this.afterCreate.bind(this));
    }

    if(options.enabledActions.update) {
      this.router.put('/:resourceId',
        this.beforeUpdate.bind(this),
        this.update.bind(this),
        this.afterUpdate.bind(this));
    }

    if(options.enabledActions.destroy) {
      this.router.delete('/',
        this.beforeDestroy.bind(this),
        this.destroy.bind(this),
        this.afterDestroy.bind(this));
    }
    
    return this;
  }
  errorHandler(res) {
    return function(error) {
      res.status(500)
        .send(error)
        .end();
    };
  }
}

module.exports = JSDataRouter;
Object.assign(JSDataRouter.prototype, findAll, find, create, update, destroy);
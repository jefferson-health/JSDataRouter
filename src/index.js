'use strict';

var express = require('express');
var findAll = require('./findAll');
var find = require('./find');
var create = require('./create');
var param = require('./param');

class JSDataRouter {

	constructor(resource, router) {
    if(router === undefined) {
      router = express.Router(); 
    }

    this.router = router;
    this.resource = resource;
    this.router.param('resourceId', param.bind(this));

		this.router.get('/',
			this.beforeFindAll.bind(this),
			this.findAll.bind(this),
			this.afterFindAll.bind(this));

    this.router.get('/:resourceId',
      this.beforeFind.bind(this),
      this.find.bind(this),
      this.afterFind.bind(this));

    this.router.post('/', 
      this.beforeCreate.bind(this),
      this.create.bind(this),
      this.afterCreate.bind(this));

    return this.router;
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
Object.assign(JSDataRouter.prototype, findAll, find, create);
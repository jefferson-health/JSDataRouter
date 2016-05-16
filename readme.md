# JS-Data Router
This library provides a set of default [Express](http://expressjs.com/) routes and handlers for use with [JSData](http://www.js-data.io/) to enable rapid RESTful API prototyping

## Installation
npm install should get you all you need `npm install jsdatarouter`

## Usage
The JSDataRouter is an ES6 class that takes a JSData resource definition (the same returned by [DS.defineResource](http://www.js-data.io/docs/dsdefineresource)) and express [router](http://expressjs.com/en/4x/api.html#router) object in its constructor and sets up RESTful routes and handlers on the router passed in. If no router is provided it will create a new one using `express.Router()`

```javascript
var DS = require('../DataStore'),
  JSDataRouter = require('jsdatarouter'),
  express = require('express'),
  router = new JSDataRouter(DS.store.definitions.state).router;

module.exports = function (app) {
  app.use('/todo', router);
};
```

## Default Actions
### CREATE: `POST /`

#### create:
calls the JSData [create](http://www.js-data.io/docs/dscreate) function with `req.body` as the argument

#### afterCreate:
sends the resource instance created in the create function and calls `end()`

---

### DESTROY: `DELETE /:resourceId`

#### destroy
calls the JSData [destroy](http://www.js-data.io/docs/dsdestroy) function with `resourceId` as the argument

#### afterDestroy:
sends a blank 200 response

---

### FIND: `GET /:resourceId`

#### find:
calls `next()`

#### afterFind:
sends the found resource instance and calls `end()`

---

### FINDALL: `GET /`

#### findAll:
retrieves all resource instances from the DataStore by calling the JSData [findAll](http://www.js-data.io/docs/dsfindall) function with `req.query` and a param object of the form `{ with: req.with }` allowing you to specify eager-loads

### afterFindAll:
sends the resource instances located in the findAll function and calls `end()`

---

### UPDATE: `PUT /:resourceId`

#### update:
calls the JSData [update](http://www.js-data.io/docs/dsupdate) function on the resource instance with the id of `resourceId` using `req.body` as an argument

#### afterUpdate:
sends the resource instance that was updated in the update function and calls `end()`

## Extending Actions
Every function on the JSDataRouter class can be re-implemented to add additional functionality. The example below adds server-side validation to a **CREATE** route before creating the resource instance.

```javascript
function validateCreateInput(req) {
  // ...
}

class TodoRouter extends JsDataRouter {
  beforeCreate(req, res, next) {
    validateCreateInput(req);
    var errors = req.validationErrors();
    if(errors) {
      res.send('validation errors: ' + util.inspect(errors), 400).end();
      return;
    }
    next();
  }
}
```

## Param Callback
Routes that include a `resourceId` parameter will automatically retrieve the resource instance that has the specified ID form the DataStore using an express [param callback](http://expressjs.com/en/api.html#app.param), and make it available via `req.resource`. Query parameters and eager-loads (specified on `req.with`) along to the JSData [find](http://www.js-data.io/docs/dsfind) function when looking up the resource instance.

### Options
By default all routes are enabled, but an optional options object can be assed into the constructor as a 3rd argument that allows you to disable each action individually. The example below will setup a new router with only the destroy route disabled.
``` javascript
var router = new JSDataRouter(
  DS.store.definitions.state,
  express.Router(), {
    destroy: false
  }
);
```

module.exports = function(req, res, next, resourceId) {
  this.resource.find(resourceId, Object.assign({with: req.with},req.query))
    .then(function(resource) {
      req.resource = resource;
      next();
    });
};
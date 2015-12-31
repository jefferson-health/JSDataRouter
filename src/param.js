module.exports = {
  name: 'resourceId',
  middleware: function(req, res, next, resourceId, resource) {
    let params = req.query
    if(req.with) {
      params = Object.assign({with: req.with}, req.query)
    }
    resource.find(resourceId, params)
      .then(function(resource) {
        req.resource = resource;
        next();
      });
  }
}
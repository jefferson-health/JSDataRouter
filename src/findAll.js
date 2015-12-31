module.exports = {
	beforeFindAll: function(req, res, next) {
	  next();
	},

	findAll: function(req, res, next, resource) {
	  this.resource.findAll(
	    req.query,
	    {
	      with: req.with
	    }
	  )
	  .then(function(resources) {
	    req.resources = resources;
	    next();
	  });
	},

	afterFindAll: function(req, res, next) {
	  res.status(200)
	    .send(req.resources);
	}
};
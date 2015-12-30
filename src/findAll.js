module.exports = {
	beforeFindAll: function(req, res, next) {
	  next();
	},

	findAll: function(req, res, next) {
	  this.resource.findAll(
	    req.query,
	    {
	      with: req.with
	    }
	  )
	  .then(function(resources) {
	    req.resources=resources;
	    next();
	  })
	  .catch(this.errorHandler(res));
	},

	afterFindAll: function(req, res, next) {
	  res.status(200)
	    .send(req.resources);
	}
};
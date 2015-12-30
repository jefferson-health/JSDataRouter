module.exports = {
	beforeCreate: function(req, res, next) {
		next();
	},

	create: function(req, res, next) {
	  this.resource.create(req.body)
	  .then(function(createdResource) {
	    req.createdResource = createdResource;
	    next();
	  })
	  .catch(this.errorHandler(res));
	},

	afterCreate: function(req, res, next) {
	  res.status(200)
	    .send(req.createdResource)
	    .end();
	}
};
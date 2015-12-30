module.exports = {

	beforeFind: function(req, res, next) {
		next();
	},

	find: function(req, res, next) {
		next();
	},

	afterFind: function(req, res, next) {
		res.status(200)
	    .send(req.resource)
	    .end();
	}

};
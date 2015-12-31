module.exports = {
  method: 'post',
  path: '/',
  beforeAction: function beforeCreate(req, res, next) {
    next();
  },

  action: function create(req, res, next, resource) {
    resource.create(req.body)
    .then(function(createdResource) {
      req.createdResource = createdResource;
      next();
    })
    .catch(next);
  },

  afterAction: function afterCreate(req, res, next) {
    res.status(200)
      .send(req.createdResource)
      .end();
  }
};
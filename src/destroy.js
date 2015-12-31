module.exports = {
  name: 'destroy',
  method: 'post',
  path: '/:resourceId',
  beforeAction: function beforeDestroy(req, res, next) {
    next();
  },

  action: function destroy(req, res, next, resource) {
    resource.destroy(req.resource.body.id)
      .then(() => {
        next();
      });
  },

  afterAction: function afterDestroy(req, res, next) {
    res.send(200)
      .end();
  }
}
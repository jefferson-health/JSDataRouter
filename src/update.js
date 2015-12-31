module.exports = {

  beforeUpdate: function beforeUpdate(req, res, next) {
    next();
  },

  update: function update(req, res, next, resource) {
    resource.update(req.body)
      .then(updatedResource => {
        req.updatedResource = updatedResource
        next();
      })
  },

  afterUpdate: function afterUpdate(req, res, next) {
    res.status(200)
      .send(req.updatedResource)
      .end()
  }
}
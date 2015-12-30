module.exports = {
  beforeDestroy: function beforeDestroy(req, res, next) {
    next();
  },

  destroy: function destroy(req, res, next) {
    this.resource.destroy(req.resource.body.id)
      .then(() => {
        next();
      })
      .catch(this.errorHandler(res));
  },

  afterDestroy: function afterDestroy(req, res, next) {
    res.send(200)
      .end();
  }
}
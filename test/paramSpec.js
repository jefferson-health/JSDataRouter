'use strict';

var paramFn = require('../src/param');

describe('param', function() {
  describe('param', function() {
    it('should call find on the resource for the resourceId and assign the result to req', function (done) {
      let resourceId = 1;
      let resource = {id: resourceId};
      let resolved = Promise.resolve(resource);
      let next = sinon.spy();
      let req = {
        with: [ 'relations' ],
        query: {where: {id: {'=' : 1}}}
      };
      let _this = {
        resource: {
          find: function() {
            return resolved;
          }
        },
        errorHandler: sinon.spy()
      };
      sinon.spy(_this.resource, 'find');
      paramFn.call(_this, req, {}, next, resourceId);

      resolved.then(function() {
        _this.resource.find.should.have.been.calledWith(resourceId,  Object.assign({with: req.with},req.query));
        next.should.have.been.calledOnce;
        req.resource.should.equal(resource);
        done();
      });
    });
  });
});

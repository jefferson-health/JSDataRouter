'use strict';

var updateFns = require('../src/update');

describe('update', function() {
  describe('beforeUpdate', function() {
    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      updateFns.beforeUpdate({}, {}, nextSpy);
      nextSpy.should.have.been.calledOnce;
    });
  });

  describe('update', function() {
    it('should call update on the resource and assign the result to req', function (done) {
      let updatedResource = {id: 1};
      let resolved = Promise.resolve(updatedResource);
      let next = sinon.spy();
      let req = { body: {
        id: 0
      }};
      let _this = {
        resource: {
          update: function() {
            return resolved;
          }
        },
        errorHandler: sinon.spy()
      };
      sinon.spy(_this.resource, 'update');
      updateFns.update.call(_this, req, {}, next);

      resolved.then(function() {
        _this.resource.update.should.have.been.calledWith(req.body);
        next.should.have.been.calledOnce;
        req.updatedResource.should.equal(updatedResource);
        done();
      });
    });
  });

  describe('afterUpdate', function() {
    it('should send a 200 response and the updated resource by default', function() {
        let res = {
          status: function() {
            return res;
          },
          end: function() {
            return res;
          },
          send: function() {
            return res;
          }
        };
        let req = {
          updatedResource: {
            id: 2
          }
        };
        sinon.spy(res,'status');
        sinon.spy(res,'send');
        sinon.spy(res,'end');
        updateFns.afterUpdate(req, res);
        res.status.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        res.send.should.have.been.calledWith(req.updatedResource);
        res.end.should.have.been.calledOnce;
        res.end.should.have.been.calledAfter(res.send);
    });
  });
});

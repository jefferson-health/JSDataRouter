'use strict';

var destroyFns = require('../src/destroy');

describe('destroy', function() {

  describe('beforeDestroy', function() {

    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      destroyFns.beforeDestroy({}, {}, nextSpy)
      nextSpy.should.have.been.calledOnce;
    })
  })

  describe('destroy', function() {

    it('should call destroy on this.resource and then call next', function (done) {
      let resolved = Promise.resolve(true)
      let resourceMock = {
        destroy: sinon.stub().returns(resolved)
      }
      let nextSpy = sinon.spy();
      let req = {
        resource: {
          body: {
            id: 1
          }
        }
      }
      let _this = {
        resource: resourceMock,
        errorHandler: sinon.spy()
      };
      destroyFns.destroy.call(_this, req, {}, nextSpy);
      resolved.then(function() {
        nextSpy.should.have.been.calledOnce;
        done();
      })
    })
  })
})
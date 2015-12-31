'use strict';

var destroyFns = require('../src/destroy');

describe('destroy', function() {

  describe('beforeDestroy', function() {

    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      destroyFns.beforeAction({}, {}, nextSpy)
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
      destroyFns.action(req, {}, nextSpy, resourceMock);
      resolved.then(function() {
        nextSpy.should.have.been.calledOnce;
        done();
      })
    })
  })
})
'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var destroy = require('../src/destroy');

describe('destroy', () => {
  describe('beforeDestroy', () => {
    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      destroy.beforeDestroy({}, {}, nextSpy)
      nextSpy.should.have.been.calledOnce;
    })
  })
})
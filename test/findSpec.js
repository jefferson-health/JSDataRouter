'use strict';

var findFns = require('../src/find');

describe('Find Functions', function() {

  describe('beforeFind', function() {
    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      findFns.beforeFind({}, {}, nextSpy);
      nextSpy.should.have.been.calledOnce;
    });
  });

  describe('find', function() {
    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      findFns.find({}, {}, nextSpy);
      nextSpy.should.have.been.calledOnce;
    });
  });

  describe('afterFind', function() {
    it('should send a 200 response and the found resource by default', function() {
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
          resource: {
            id: 2
          }
        };
        sinon.spy(res,'status');
        sinon.spy(res,'send');
        sinon.spy(res,'end');
        findFns.afterFind(req, res);
        res.status.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        res.send.should.have.been.calledWith(req.resource);
        res.end.should.have.been.calledOnce;
        res.end.should.have.been.calledAfter(res.send);
    });
  });
});

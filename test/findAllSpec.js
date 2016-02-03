'use strict';

var findAllFns = require('../src/findAll');

describe('Find All Functions', function() {
  describe('beforeFindAll', function() {
    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      findAllFns.beforeFindAll({}, {}, nextSpy);
      nextSpy.should.have.been.calledOnce;
    });
  });

  describe('findAll', function() {
    it('should call findAll on the resource and assign the result to req', function (done) {
      let resources = [{id: 1}, {id: 2}];
      let resolved = Promise.resolve(resources);
      let next = sinon.spy();
      let req = {
        query: {where: { id: { '=': 1}}},
        with: [ 'relations' ]
      };
      let _this = {
        resource: {
          findAll: function() {
            return resolved;
          }
        },
        errorHandler: sinon.spy()
      };
      sinon.spy(_this.resource, 'findAll');
      findAllFns.findAll.call(_this, req, {}, next);

      resolved.then(function() {
        _this.resource.findAll.should.have.been.calledWith(req.query, { with: req.with });
        next.should.have.been.calledOnce;
        req.resources.should.equal(resources);
        done();
      });
    });
  });

  describe('afterFindAll', function() {
    it('should send a 200 response and the found resources by default', function() {
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
          resources: [{
            id: 2
          },{
            id: 3
          }]
        };
        sinon.spy(res,'status');
        sinon.spy(res,'send');
        sinon.spy(res,'end');
        findAllFns.afterFindAll(req, res);
        res.status.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        res.send.should.have.been.calledWith(req.resources);
        res.end.should.have.been.calledOnce;
        res.end.should.have.been.calledAfter(res.send);
    });
  });
});

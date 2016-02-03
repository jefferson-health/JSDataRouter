'use strict';

var createFns = require('../src/create');

describe('Create Functions', function() {

  describe('beforeCreate', function() {

    it('should call next by default', () => {
      let nextSpy = sinon.spy();
      createFns.beforeCreate({}, {}, nextSpy);
      nextSpy.should.have.been.calledOnce;
    });
  });


  describe('create', function() {

    it('should call create on this.resource with req.body and then call next', function (done) {
        let resolved = Promise.resolve(true);
        let req, next;
        req = {
          body: {
            id:1
          }
        };
        next = sinon.spy();

        let _this = {
          resource: {
            create: function() {
              return resolved;
            }
          },
          errorHandler: sinon.spy()
        };

        let createdResource = req.body;
        sinon.spy(_this.resource, 'create');
        createFns.create.call(_this, req, {}, next);

        resolved.then(function() {
          _this.resource.create.should.have.been.calledWith(createdResource);
          next.should.have.been.calledOnce;
          req.body.should.equal(createdResource);
          done();
        });
    });
  });

  describe('afterCreate', function() {
    it('should send a 200 response with the created resource by default', function() {
        let res = {
          status: function() {
            return res;
          },
          send: function() {
            return res;
          },
          end: function() {
            return res;
          }
        };
        let req = {
          createdResource: {id:2}
        };
        sinon.spy(res,'status');
        sinon.spy(res,'send');
        sinon.spy(res,'end');
        createFns.afterCreate(req, res);
        res.status.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        res.send.should.have.been.calledOnce;
        res.send.should.have.been.calledWith(req.createdResource);
        res.end.should.have.been.calledOnce;
        res.end.should.have.been.calledAfter(res.send);
    });
  });
});

var supertest = require("supertest");

describe('Controller: RootController', function () {
  context('index', function () {
    var request = null;

    before(function () {
      request = supertest(sails.hooks.http.app);
    });

    it('should pass 200', function (done) {
      request.get('/').expect(200, done);
    });
  });
});

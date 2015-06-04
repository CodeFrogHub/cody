var should = require("should");

describe('Model: User', function () {
  var data = null;

  beforeEach(function () {
    data = {
      email: 'test@codefrog.de',
      password: 'test1234',
      passwordConfirmed: 'test1234'
    };
  });

  context('schema', function () {
    it('should not save undefined attributes', function (done) {
      User.create(data).exec(function (err, created) {
        if(err) {
          return done(err);
        }
        created.should.not.have.property('passwordConfirmed');
        done();
      });
    });
  });

  context.only('attribute', function () {
    context('email', function () {
      it('should be required', function (done) {
        data.email = '';
        User.validate(data, function (err) {
          should.exist(err);
          done();
        });
      });
      it('should be unique', function (done) {
        User.create(data)
          .exec(function (err, created) {
            if (err) return done(err);
            User.create(data)
              .exec(function (err) {
                should.exist(err);
                done();
              });
          });
      });
      it('should be an email', function (done) {
        data.email = "NotReallyAnEmailAddress.de";
        User.validate(data, function (err) {
          should.exist(err);
          err.details.should.containEql("email");
          done();
        });
      });
      it('should have to contain "codefrog.de"', function (done) {
        data.email = "test@codefrog.com";
        User.validate(data, function (err) {
          should.exist(err);
          err.details.should.containEql("email");
          done();
        });
      });
    });
    context('password', function () {
      it('should be required', function (done) {
        data.password = "";
        User.validate(data, function (err) {
          should.exist(err);
          err.details.should.containEql("password");
          err.details.should.containEql("required");
          done();
        });
      });
      it('should have min length of 8', function (done) {
        data.password = "test";
        User.validate(data, function (err) {
          should.exist(err);
          err.details.should.containEql("password");
          err.details.should.containEql("minLength");
          done();
        });
      });
      it('should be hashed after create', function (done) {
        User.create(data).exec(function (err, created) {
          should.not.exist(err);
          created.password.should.not.eql(data.password);
          done();
        });
      });
      it('should be hashed after update', function (done) {
        User.create(data).exec(function (err, created) {
          var newPass = "tester123123123123";
          created.changePassword(newPass, function (err, u) {
            should.not.exist(err);
            u.password.should.not.eql(newPass);
            done();
          });
        });
      });
    });
  });

  context('method', function () {
    var created = null;

    beforeEach(function (done) {
      User.create(data).exec(function (err, user) {
        created = user;
        done();
      });
    });

    context('changePassword', function () {
      it('should change the password and save', function (done) {
        var newPass = "tester123123123123";
        created.changePassword(newPass, function (err, u) {
          should.not.exist(err);
          u.password.should.not.eql(newPass);
          done();
        });
      })
    });
    context('validPassword', function () {
      it('should return true if password is valid', function (done) {
        created.validPassword(data.password, function (err, valid) {
          should.not.exist(err);
          valid.should.be.true;
          done();
        });
      });

      it('should return false if password is invalid', function (done) {
        created.validPassword("wrongpassword", function (err, valid) {
          should.not.exist(err);
          valid.should.be.false;
          done();
        });
      });
    });
  });

  afterEach(function (done) {
    User.destroy({}).exec(function (err) {
      done(err);
    });
  });
});

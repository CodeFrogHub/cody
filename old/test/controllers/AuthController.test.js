var supertest = require("supertest");

var rand = require("random-key");
var moment = require("moment");

describe('Controller: AuthController', function () {
  var userData = null;
  var request = null;

  before(function () {
    request = supertest(sails.hooks.http.app);
  });

  beforeEach(function () {
    userData = {
      email: 'test@codefrog.de',
      password: 'test1234',
      password_confirm: 'test1234'
    };
  });

  context('authenticate', function () {
    var createdUser = null;

    beforeEach(function (done) {
      User.create(userData).exec(function (err, created) {
        createdUser = created;
        done(err);
      });
    });

    it('should authenticate created user and response token and user', function (done) {
      request.post('/login').send(userData)
        .expect(200)
        .expect(function (res) {
          if (!('token' in res.body)) return "missing token";
          if (!('user' in res.body)) return "missing user";
        })
        .end(done);
    });

    it('should response 401 for missing params', function (done) {
      request.post('/login').send()
        .expect(401, done);
    });

    it('should response 401 for invalid email', function (done) {
      userData.email = "test2@codefrog.de";
      request.post('/login').send(userData)
        .expect(401, done);
    });

    it('should response 401 for invalid password', function (done) {
      userData.password = "anotherpassword";
      request.post('/login').send(userData)
        .expect(401, done);
    });
  });

  context('register', function () {
    it('should register a new user and response token and user', function (done) {
      request.post('/register').send(userData)
        .expect(200)
        .expect(function (res) {
          if (!('token' in res.body)) return "missing token";
          if (!('user' in res.body)) return "missing user";
        })
        .end(done);
    });

    it('should response 401 if passwords do not match', function (done) {
      userData.password_confirm = "anotherpassword";
      request.post('/register').send(userData)
        .expect(401, done);
    });

    it('should response 400 if user already exists', function (done) {
      User.create(userData).exec(function (err, created) {
        if (err) return done(err);

        request.post('/register').send(userData)
          .expect(400, done);
      });
    });
  });
  
  context('resend_activation', function(){
    var createdUser = null;

    beforeEach(function (done) {
      User.create(userData).exec(function (err, created) {
        createdUser = created;
        done(err);
      });
    });
    
    it('should resend activation mail again if email is valid', function(done) {
      request.post('/resend_activation').send({email: userData.email})
        .expect(200, done);
    });
    
    it('should response 401 if missing email', function (done) {
      request.post('/resend_activation').send({})
        .expect(401, done);
    });

    it('should response 401 if wrong email', function (done) {
      request.post('/resend_activation').send({email: 'test2@codefrog.de'})
        .expect(401, done);
    });
  });
  
  context('activate', function(){
    var createdUser = null;
    beforeEach(function (done) {
      userData.activationKey = "abc";
      User.create(userData).exec(function (err, created) {
        createdUser = created;
        done(err);
      });
    });
    it('should activate the user', function(done) {
      request.post('/activate').send({email: userData.email, key: userData.activationKey})
        .expect(200)
        .expect(function(res) {
          if (!('token' in res.body)) return "missing token";
          if (!('user' in res.body)) return "missing user";
        })
        .end(done);
    });
    
    it('should response 401 if missing email', function (done) {
      request.post('/activate').send({key: userData.activationKey})
        .expect(401, done);
    });

    it('should response 401 if wrong email', function (done) {
      request.post('/activate').send({email: 'test2@codefrog.de', key: userData.activationKey})
        .expect(401, done);
    });
    
    it('should response 401 if missing key', function (done) {
      request.post('/activate').send({email: userData.email})
        .expect(401, done);
    });

    it('should response 401 if wrong key', function (done) {
      request.post('/activate').send({email: userData.email, key: 'cde'})
        .expect(401, done);
    });
  });

  context('forget_password', function () {
    var createdUser = null;

    beforeEach(function (done) {
      User.create(userData).exec(function (err, created) {
        createdUser = created;
        done(err);
      });
    });

    it('should response 200', function (done) {
      request.post('/forget_password').send({email: userData.email})
        .expect(200, done);
    });

    it('should response 401 if missing email', function (done) {
      request.post('/forget_password').send({})
        .expect(401, done);
    });

    it('should response 401 if wrong email', function (done) {
      request.post('/forget_password').send({email: 'test2@codefrog.de'})
        .expect(401, done);
    });
  });

  context('verify_passwordkey', function () {
    var userData2 = null;

    beforeEach(function (done) {
      userData.forgetPasswordKey = rand.generate();
      userData.forgetPasswordTimestamp = new Date(moment().subtract(11, 'hours'));

      userData2 = {
        email: "test2@codefrog.de",
        password: "test1234",
        forgetPasswordKey: rand.generate(),
        forgetPasswordTimestamp: new Date(moment().subtract(13, 'hours'))
      };

      User.create([userData, userData2]).exec(function (err, created) {
        done(err);
      });
    });

    it('should response 200 and a token if key is valid', function (done) {
      request.post('/verify_passwordkey').send({
        email: userData.email,
        key: userData.forgetPasswordKey
      })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.should.have.property('token');
          done();
        });
    });

    it('should response 401 for missing params', function (done) {
      request.post('/verify_passwordkey').send()
        .expect(401, done);
    });

    it('should response 401 for invalid email', function (done) {
      request.post('/verify_passwordkey').send({
        email: 'any@email.com',
        key: userData.forgetPasswordKey
      })
        .expect(401, done);
    });

    it('should response 401 if key expired', function (done) {
      request.post('/verify_passwordkey').send({
        email: userData2.email,
        key: userData2.forgetPasswordKey
      })
        .expect(401, done);
    });

    it('should response 401 for invalid key', function (done) {
      request.post('/verify_passwordkey').send({
        email: userData.email,
        key: 'invalid key'
      })
        .expect(401, done);
    });
  });

  afterEach(function (done) {
    User.destroy({}).exec(function (err) {
      done(err);
    });
  });
});

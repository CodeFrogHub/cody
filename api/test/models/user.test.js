// Logger
var log = require('debug')('hogd:mocha_api_model_user_test');
// Requirements
log('Load Requirements');
var should = require('should');
var DatabaseService = require('../../services/Database');
var mongoose = require('mongoose');
var models = require('../../models');
var conf = require('../../config');
describe('User Model Test', function () {
    var User = models.User;
    var user = null;
    var exampleUser = {
        name: 'Test',
        username: 'Test',
        email: 'test@test.com',
        password: 'test'
    };

    before(function (done) {
        log('Database: ' + conf.api.mongodb);
        DatabaseService(conf, function (err) {
            should.not.exist(err);
            done();
        });
    });

    beforeEach(function () {
        user = new User(exampleUser);
    });

    it('should given an empty collection in mongodb', function (done) {
        User.find({}, function (err, users) {
            should.not.exist(err);
            users.length.should.be.eql(0);
            done();
        });
    });

    it('should save a user', function (done) {
        user.save(function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('should not save the user again', function (done) {
        user.save(function (err) {
            should.exist(err);
            done();
        });
    });

    it('should not save the user without username', function (done) {
        user.username = '';
        user.save(function (err) {
            should.exist(err);
            done();
        });
    });

    it('should not save the user without email', function (done) {
        user.email = '';
        user.save(function (err) {
            should.exist(err);
            done();
        });
    });
    it('should not save the user without password', function (done) {
        user.password = '';
        user.save(function (err) {
            should.exist(err);
            done();
        });
    });
    it('should saved a generated hash for the password', function (done) {
        User.findOne({email: user.email, username: user.username}, '+password', function (err, foundUser) {
            should.not.exist(err);
            foundUser.password.should.not.be.eql(user.password);
            done();
        });
    });
    it('should not possible to save a username with spaces', function (done) {
        user.username = 'john doe';
        user.save(function (err) {
            should.exist(err);
            done();
        });
    });
    it('should not have the password property in select', function (done) {
        User.loadByEmailOrUsername(user.username, function (err, foundUser) {
            should.not.exist(err);
            should.not.exist(foundUser.password);
            done();
        });
    });
    it('should have the password property in select', function (done) {
        User.loadByEmailOrUsernameWithPassword(user.username, function (err, foundUser) {
            should.not.exist(err);
            should.exist(foundUser.password);
            done();
        });
    });
    it('should load the user by username even if case is different', function (done) {
        user.username.should.not.eql(user.username.toUpperCase());
        User.loadByEmailOrUsername(user.username.toUpperCase(), function (err, foundUser) {
            should.not.exist(err);
            foundUser.username.should.be.eql(user.username);
            done();
        });
    });
    it('should load the user by email even if case is different', function (done) {
        user.email.should.not.eql(user.email.toUpperCase());
        User.loadByEmailOrUsername(user.email.toUpperCase(), function (err, foundUser) {
            should.not.exist(err);
            foundUser.email.should.be.eql(user.email);
            done();
        });
    });
    it('should not save a username with special characters', function (done) {
        user.username = "John Down"
        user.save(function (err) {
            should.exist(err);
            user.username = "John_Down"
            user.save(function (err) {
                should.exist(err);
                user.username = "John-Down"
                user.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });
    });
    after(function (done) {
        User.remove(done);
    });
});
should = require 'should'

describe "Service Password", ->
  password = "test"
  it "should encrypt a given password", (done) ->
    PasswordService.encrypt password, (err, encryptedPassword) ->
      should.not.exist err
      encryptedPassword.should.not.be.eql password
      done()

  it "should check a given password with an encryptedPassword and return valid true", (done) ->
    PasswordService.encrypt password, (err, encryptedPassword) ->
      should.not.exist err
      encryptedPassword.should.not.be.eql password
      PasswordService.check password, encryptedPassword, (err, valid) ->
        should.not.exist err
        valid.should.be.ok
        done()

    it "should check a given password with an encryptedPassword and return valid false", (done) ->
      PasswordService.encrypt password, (err, encryptedPassword) ->
        should.not.exist err
        encryptedPassword.should.not.be.eql password
        PasswordService.check "anotherPassword", encryptedPassword, (err, valid) ->
          should.not.exist err
          valid.should.not.be.ok
          done()

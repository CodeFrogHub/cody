Passwords = require('machinepack-passwords');

module.exports.encrypt = (password, callback) ->
  Passwords.encryptPassword
    password: password
  .exec
    error: (err) ->
      callback err, null
    success: (result) ->
      callback null, result

module.exports.check = (password, encryptPassword, callback) ->
  Passwords.checkPassword
    passwordAttempt: password
    encryptedPassword: encryptPassword
  .exec
    # An unexpected error occurred.
    error: (err) ->
      callback err

    # Password attempt does not match already-encrypted version
    incorrect: () ->
      callback null, false

    # OK.
    success: () ->
      callback null, true

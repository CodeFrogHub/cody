jsonwebtoken = require 'jsonwebtoken'
moment = require 'moment'

module.exports.issueToken = (subject, secret, expire) ->
  payload =
    subject: subject,
    iat: moment().unix(),
    exp: moment().add(expire, 'seconds').unix()

  return jsonwebtoken.sign payload, secret

module.exports.verifyToken = (token, secret, done) ->
  return jsonwebtoken.verify token, secret, done

jsonwebtoken = require 'jsonwebtoken'
moment = require 'moment'

module.exports.issueToken = (sub, secret, expire) ->
  payload =
    sub: sub,
    iat: moment().unix(),
    exp: moment().add(expire, 'seconds').unix()

  return jsonwebtoken.sign payload, secret

module.exports.verifyToken = (token, secret, done) ->
  return jsonwebtoken.verify token, secret, done

jsonwebtoken = require 'jsonwebtoken'
moment = require 'moment'

module.exports.issueToken = (sub) ->
  payload =
    sub: sub,
    iat: moment().unix(),
    exp: moment().add(cody.config.jwt.expire, 'seconds').unix()
    
  return jsonwebtoken.sign payload, cody.config.jwt.secret

module.exports.verifyToken = (token, done) ->
  return jsonwebtoken.verify token, cody.config.jwt.secret, done
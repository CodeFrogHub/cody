module.exports = (req, res, next) ->
  return res.locals.responseError.unauthorized next unless req.headers and req.headers.authorization

  [scheme, credentials] = req.headers.authorization.split ' '
  token = credentials if /^Bearer$/i.test scheme

  return res.locals.responseError.unauthorized next unless token
  
  JwtService.verifyToken token, res.locals.config.jwt.secret, (err, verifiedToken) ->
    return next err if err
    
    User.findOneById verifiedToken.subject.id
    .populate 'groups'
    .then (user) -> 
      req.user = user
      next()
    .catch (err) -> next err
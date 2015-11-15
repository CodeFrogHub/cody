module.exports =
  generate: (req, res, next) ->
    email = req.body.email
    password = req.body.password 

    return res.locals.responseError.badRequest next unless email or password

    User.findOneByEmail email
    .then (user) ->
      return res.locals.responseError.badRequest "Wrong credentials", next unless user
      user.validatePassword password, (err, valid) ->
        return next err if err
        return res.locals.responseError.badRequest "Wrong credentials", next unless valid

        res.json
          token: JwtService.issueToken
            id: user.id
          , res.locals.config.jwt.secret, res.locals.config.jwt.expire

    .catch (err) -> 
      next err

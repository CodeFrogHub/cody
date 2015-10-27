express = require 'express'
Router = express.Router()

Router.post '/token', (req, res, next) ->
  email = req.body.email # or req.params.email or req.query.email
  password = req.body.password # or req.params.password or req.query.password
  if !email or !password
    return res.status(401).json err: 'email and password required'
    
  Admin.findOneByEmail email, (err, admin) ->
    return res.status(500).json err: err if err
    return res.status(401).json err: 'invalid email or password' if !admin
    
    admin.checkPassword password, (err, valid) ->
      if err
        return res.status(403).json err: 'forbidden'
      if !valid
        return res.status(401).json err: 'invalid email or password'
      else
        res.json
          user: admin.toJSON()
          token: JWTService.issueToken(admin)

module.exports = Router
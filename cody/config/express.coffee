path = require 'path'

express = require 'express'
i18n = require 'i18n'

favicon = require 'serve-favicon'
bodyparser = require 'body-parser'
cookieparser = require 'cookie-parser'
methodoverride = require 'method-override'
session = require 'express-session'
morgan = require 'morgan'
flash = require 'flash'

ConnectMincer = require 'connect-mincer'


module.exports = (app, done) ->
  app.log "Configure Express"
  
  # view engine
  app.set 'views', path.resolve __dirname, '..', 'views'
  app.set 'view engine', 'jade'
  app.locals.pretty = true
  
  # Favicon
  app.use favicon path.resolve __dirname, '..', 'public/favicon.ico'
  
  # Body Parser
  app.use bodyparser.json()
  app.use bodyparser.urlencoded
    extended: false
    
  # Cookie Parser
  app.use cookieparser()
  
  # Method Override
  app.use methodoverride()
  
  # Sessions
  # TODO: Session Store
  # _.merge app.config.session,
  #   store: 
  app.use session app.config.session
  
  # force https on heroku
  if app.config.env is 'production'
    app.use (req, res, next) ->
      protocol = req.get 'x-forwarded-proto'
      if protocol is 'https' then next() else res.redirect 'https://' + req.hostname + req.url
  
  # Public Folder
  app.use express.static path.resolve(__dirname, '..', 'public'),
    redurect: false
    
  # Assets
  connectMincer = new ConnectMincer app.config.assets.mincer
  app.use connectMincer.assets()
  app.use '/assets', connectMincer.createServer() unless app.config.env is 'production'
  
  # Flash Notifier
  app.use flash()
  
  # Request Logger
  app.use morgan 'dev' if app.config.env is 'development'
  
  # i18n
  i18n.configure app.config.i18n
  app.use i18n.init
  
  done()
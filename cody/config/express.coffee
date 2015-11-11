path = require 'path'

express = require 'express'

bodyparser = require 'body-parser'
cookieparser = require 'cookie-parser'
methodoverride = require 'method-override'
session = require 'express-session'

utils = require '../utils'

module.exports.express =
  loadDefaults: (app) ->
    app.env = app.get 'env'

    app.disable 'x-powered-by'
    app.locals.pretty = app.env is 'production'

    app.set 'views', path.resolve app.root, 'views'
    app.set 'view engine', 'jade'

    publicFolderPath = path.resolve app.root, 'public'
    if utils.file.checkPath publicFolderPath
      app.use express.static publicFolderPath,
        redirect: false



  init: (app, done=(->)) ->
    app.config.express.loadDefaults app

    app.use bodyparser.json()
    app.use bodyparser.urlencoded
      extended: false

    app.use cookieparser()
    app.use methodoverride()

    app.use session app.config.session

    done()

  errorHandler: (app) ->
    app.use (req, res, next) ->
      err = new Error 'Not found'
      err.status = 404
      next err

    app.use (err, req, res, next) ->
      res.status err.status or 500
      res.render 'error',
        message: err.message
        error: if app.env is 'production' then {} else err

module.exports.routes = (app, done=(->)) ->

  # link helper and other to res.locals
  app.use (req, res, next) ->
    app._.merge res.locals, req.app.helpers
    next()

  app.log "Mount Apps"
  app.use '/api', app.apps.api
  app.use '/admin', app.apps.admin

  app.config.express.errorHandler app

  done()

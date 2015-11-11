module.exports.routes = (app, done=(->)) ->

  app.use '/api', app.apps.api
  app.use '/admin', app.apps.admin

  done()

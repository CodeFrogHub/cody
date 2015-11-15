module.exports.routes = (app, done=(->)) ->

  # V1 API
  app.use '/v1', app.middlewares.tokenAuth, app.parent.middlewares.authorize(['codefrogger'])

  app.get '/v1/users', app.controllers.users.index
  app.get '/v1/users/:id', app.controllers.users.show
  
  app.get '/v1/groups', app.controllers.groups.index
  app.get '/v1/groups/:id', app.controllers.groups.show


  # Open API Routes
  app.post '/auth', app.controllers.token.generate
  app.get '/', app.controllers.root.index

  # errorHandler
  app.config.express.errorHandler app

  done()

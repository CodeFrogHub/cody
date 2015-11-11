path = require 'path'

module.exports.bootstrap = (app, done=(->)) ->
    app.config.host = if app.config.ip then "#{app.config.ip}:#{app.config.port}" else app.config.port

    app.async.series [
      (done) ->
        #before
        done()
      (done) -> app.config.loadServices app, done
      (done) -> app.config.exposeServices app, done
      (done) -> app.config.database.init app, done
      (done) -> app.config.exposeModels app, done
      (done) -> app.config.express.init app, done
      (done) ->
        # after
        done()
    ], (err) -> done err


module.exports.loadServices = (app, done=(->)) ->
  # load services
  app.services = {}
  serviceFiles = app.utils.file.findInPath path.resolve app.root, 'services'
  for serviceFilePath, serviceFile of serviceFiles
    app.log "load service #{serviceFile.basename}"
    app.services[serviceFile.basename] = require serviceFilePath
  done()

module.exports.exposeServices = (app, done=(->)) ->
  # expose servoces
  for key, service of app.services
    gkey = "#{app._.capitalize app._.camelCase key}Service"
    app.log "expose service #{key} as #{gkey}"
    global[gkey] = service
  done()

module.exports.exposeModels = (app, done=(->)) ->
  #expose models
  for key, model of app.models
    gkey = app._.capitalize app._.camelCase key
    app.log "expose model #{key} as #{gkey}"
    global[gkey] = model
  done()

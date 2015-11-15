path = require 'path'

module.exports.bootstrap = (app, config={}, done=(->)) ->
  app._.merge app.config, config

  app.config.host = if app.config.ip then "#{app.config.ip}:#{app.config.port}" else app.config.port

  app.async.series [
    (done) ->
      #before
      done()
    (done) -> app.config.loadExtension app, done
    (done) -> app.config.loadServices app, done
    (done) -> app.config.loadModels app, done
    (done) -> app.config.loadMiddlewares app, done
    (done) -> app.config.loadHelpers app, done
    (done) -> app.config.loadApps app, done

    (done) -> app.config.database.init app, done
    (done) -> app.config.express.init app, done

    (done) -> app.config.exposeServices app, done
    (done) -> app.config.exposeModels app, done

    (done) -> app.config.routes app, done

    (done) ->
      # after

      # seed some db data
      app.async.series [
        (done) ->
          Group.findOrCreate [
            name: 'admin'
          , name: 'codefrogger'
          ],
          [
            name: 'admin'
          , name: 'codefrogger'
          ]
          .then (groups) ->
            User.findOrCreate
              email: 'm.neundorf@codefrog.de'
            ,
              email: 'm.neundorf@codefrog.de'
              password: '12345678'
              groups: groups

            .then (users) ->
              done()
              
            .catch (err) -> done err
          .catch (err) -> done err
      ], done

  ], (err) -> done err


module.exports.loadModels = (app, done=(->)) ->
  app.models = Utils.file.loadAndMerge path.resolve(app.root, 'models'),
    onFileBasename: true
    onRequire: (filePath, fileObj) ->
      cfg = require filePath

      assignMethod = Utils.lodash.defaultAssign
      assignMethod = app._.assign if app.config.database.useDefaults
      assignMethod cfg, app.config.database.modelDefaults,
        identity: fileObj.basename
        tableName: fileObj.basename

      return cfg

  app.log "loaded models %j", Object.keys app.models

  return done()

module.exports.loadApps = (app, done=(->)) ->
  app.apps = Utils.file.loadAndMerge path.resolve(app.root, 'apps'),
    matcher: (file, filePath, fileStats) ->
      return fileStats.isDirectory()
    onFileBasename: true
    onRequire: (filePath, fileObj) ->
      return require filePath

  app.log "loaded apps %j", Object.keys app.apps
  return done()
  ###
  app.apps = {}
  appFiles = Utils.file.findInPath path.resolve(app.root, 'apps'),
    matcher: (file, filePath, fileStats) ->
      return fileStats.isDirectory()

  for appFilePath, appFile of appFiles
    app.log "load app #{appFile.basename}"
    app.apps[appFile.basename] = require appFilePath
    app.config.express.loadDefaults app.apps[appFile.basename]

  done();
  ###
module.exports.loadMiddlewares = (app, done=(->)) ->
  # load services
  app.middlewares = Utils.file.loadAndMerge path.resolve(app.root, 'middlewares'),
    onFileBasename: true
  app.log "loaded middlewares %j", Object.keys app.middlewares
  done()

module.exports.loadServices = (app, done=(->)) ->
  # load services
  app.services = Utils.file.loadAndMerge path.resolve(app.root, 'services'),
    onFileBasename: true
  app.log "loaded services %j", Object.keys app.services
  done()

module.exports.exposeServices = (app, done=(->)) ->
  # expose servoces
  for key, service of app.services
    gkey = "#{app._.capitalize app._.camelCase key}Service"
    # app.log "expose service #{key} as #{gkey}"
    global[gkey] = service
  done()

module.exports.exposeModels = (app, done=(->)) ->
  #expose models
  for key, model of app.models
    gkey = app._.capitalize app._.camelCase key
    # app.log "expose model #{key} as #{gkey}"
    global[gkey] = model
  done()

module.exports.loadHelpers = (app, done=(->)) ->
  app.helpers = Utils.file.loadAndMerge path.resolve(app.root, 'helpers'),
    onFileBasename: true
    onRequire: (filePath) ->
      require(filePath) app
  app.log "loaded helpers %j", Object.keys app.helpers
  #
  #helperFiles = Utils.file.findInPath path.resolve app.root, 'helpers'
  #for helperFilePath, helperFile of helperFiles
  #  hkey = app._.camelCase helperFile.basename
  #  app.log "load helper #{hkey}"
  #  app.locals[hkey] = require(helperFilePath) app
  done()

module.exports.loadExtension = (app, done=(->)) ->
  app.extensions = Utils.file.loadAndMerge path.resolve(app.root, 'extensions'),
    onFileBasename: true
  app.log "loaded extensions %j", Object.keys app.extensions
  done()
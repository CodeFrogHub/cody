path = require 'path'
waterline = require 'waterline'

module.exports.database =
  init: (app, done=(->)) ->
    app.orm = new waterline()

    app.async.series [
      (done) -> app.config.database.loadModels app, done
      (done) -> app.config.database.loadOrm app, done
    ], (err) -> done err


  loadModels: (app, done=(->)) ->
    modelFiles = Utils.file.findInPath path.resolve app.root, 'models'
    for modelFilePath, modelFile of modelFiles
      cfg = require modelFilePath

      assignMethod = Utils.lodash.defaultAssign
      assignMethod = app._.assign if app.config.database.useDefaults
      assignMethod cfg, app.config.database.modelDefaults,
        identity: modelFile.basename
        tableName: modelFile.basename

      model = waterline.Collection.extend cfg
      app.log "load model #{cfg.identity} (connection: #{cfg.connection})"
      app.orm.loadCollection model
    done()

  loadOrm: (app, done=(->)) ->
    app.orm.initialize app.config.database.waterline, (error, o) ->
      return done error if error

      app.models = o.collections
      app.connections = o.connections
      done()

  useDefaults: false

  waterline:
    adapters:
      disk: require 'sails-disk'
      mongo: require 'sails-mongo'

    connections:
      disk:
        adapter: 'disk'
      otherDisk:
        adapter: 'disk'
      #mongo:
      #  adapter: 'mongo'

    defaults:
      migrate: 'alter'

  modelDefaults:
    connection: 'disk'
    schema: true

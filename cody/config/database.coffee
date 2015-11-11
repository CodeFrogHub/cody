path = require 'path'
waterline = require 'waterline'

module.exports.database =
  init: (app, done=(->)) ->
    app.orm = new waterline()

    modelFiles = app.utils.file.findInPath path.resolve app.root, 'models'
    for modelFilePath, modelFile of modelFiles
      cfg = require modelFilePath
      app._.merge cfg, app.config.database.modelDefaults,
        identity: modelFile.basename
        tableName: modelFile.basename
      model = waterline.Collection.extend cfg
      app.log "load model #{cfg.identity}"
      app.orm.loadCollection model

    app.orm.initialize app.config.database.waterline, (error, o) ->
      return done error if error

      app.models = o.collections
      app.connections = o.connections
      done()

  waterline:
    adapters:
      disk: require 'sails-disk'
      mongo: require 'sails-mongo'

    connections:
      disk:
        adapter: 'disk'
      #mongo:
      #  adapter: 'mongo'

    defaults:
      migrate: 'alter'

  modelDefaults:
    connection: 'disk'
    schema: true

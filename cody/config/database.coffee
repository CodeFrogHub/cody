path = require 'path'
waterline = require 'waterline'

module.exports.database =
  init: (app, done=(->)) ->
    app.orm = new waterline()

    # load collections
    app.rawModelConfigs = app.models
    for key, model of app.models
      app.orm.loadCollection waterline.Collection.extend app._.merge {}, model, app.extensions.orm

    app.orm.initialize app.config.database.waterline, (error, o) ->
      return done error if error

      app.log "Waterline initialized"
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

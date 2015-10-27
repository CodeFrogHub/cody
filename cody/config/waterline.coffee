waterline = require 'waterline'
_ = require 'lodash'

module.exports = (app, done) ->
  app.log "Configure ORM"
  app.orm = new waterline()
  
  loadModel = (relPath) -> # from models folder
    app.log "Load Model '#{_.capitalize relPath}'"
    config = _.merge {}, app.config.models, require '../models/' + relPath
    waterline.Collection.extend config
  
  # LOAD MODELS HERE
  
  # load.ormCollection loadModel 'fileName'
  
  # END: LOAD MODELS HERE
  
  app.log "Initialize ORM"
  app.orm.initialize app.config.database, (err, models) ->
    return done err if err
    
    for key, model of models.collections
      gkey = _.capitalize _.camelCase key
      app.log "Expose Model '#{gkey}' globally"
      global[gkey] = model 
    
    app.models = models.collections
    app.connections = models.connections
    
    done()
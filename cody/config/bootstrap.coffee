path = require 'path'

async = require 'async'
_ = require 'lodash'

module.exports = (app, done) ->
  app.log "Run Bootstrap"
  async.series [
    (done) ->
      _.merge global, require path.resolve __dirname, '..', 'services'
      done()
      
    (done) ->
      global.policy = {}
      _.merge global.policy, require path.resolve __dirname, '..', 'policies'
      done()
      
    (done) -> app.config.waterline app, done
    (done) -> app.config.express app, done
  ], (err, results) ->
    done err
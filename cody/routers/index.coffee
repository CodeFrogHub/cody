async = require 'async'

module.exports = (app, done) ->

  async.series [
    (done) -> require('./api') app, done
    (done) -> require('./admin') app, done
    (done) ->
      app.use require './ui'
      done()
  ], (err, result) -> done err
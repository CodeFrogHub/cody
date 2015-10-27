async = require 'async'

module.exports = (app, done) ->
  async.series [
      (done) ->
          # seed something
          # and finish with done
          done()
  ], (err, results) ->
    done ->
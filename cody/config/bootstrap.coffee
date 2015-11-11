module.exports.bootstrap = (app, done=(->)) ->
    app.config.host = if app.config.ip then "#{app.config.ip}:#{app.config.port}" else app.config.port

    app.async.series [
      (done) ->
        #before
        done()
      (done) -> app.config.database.init app, done
      (done) -> app.config.express.init app, done
      (done) ->
        # after
        done()
    ], (err) -> done err

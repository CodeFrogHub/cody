module.exports.express =
  errorHandler: (app) ->
    app.use (req, res, next) ->
      err = new Error 'Not found'
      err.status = 404
      next err

    app.use (err, req, res, next) ->
      res.status err.status or 500
      res.json
        message: err.message
        error: if app.env is 'production' then {} else err
        stack: if app.env is 'production' then [] else "#{err.stack}".split '\n'

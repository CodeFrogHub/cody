module.exports = (app) ->
  check = (msg) ->
    return msg if app._.isString msg

  badRequest: (msg, next=msg) ->
    app.helpers.responseError.error check(msg) or "Bad request", 400, next

  unauthorized: (msg, next=msg) ->
    app.helpers.responseError.error check(msg) or "Unauthorized", 401, next

  paymentRequired: (msg, next=msg) ->
    app.helpers.responseError.error check(msg) or "Payment Required", 402, next

  forbidden: (msg, next=msg) ->
    app.helpers.responseError.error check(msg) or "Forbidden", 403, next

  # TODO
  # method not allowed
  # not acceptable
  # proxy authentication Required
  # request time-out
  # conflict
  # gone
  # length required
  # precondition failed
  # request entity too large
  # request-url too long
  # unsupported media type
  # requested range not satisfiable
  # expectation failed
  # i'm a teapot
  # policy not fullfilled
  # misdirected request
  # unprocessable entity
  # locked
  # failed dependency
  # upgrade required
  # precondition required
  # too many requests


  error: (msg="Server error", status=500, next) ->
    err = new Error msg
    err.status = status
    next err

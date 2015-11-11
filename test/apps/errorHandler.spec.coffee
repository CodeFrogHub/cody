App.use '/server-error', (req, res, next) ->
  next new Error "server error"

describe "Cody Request ErrorHandler", ->
  it "should reponse 404 for not existing route", (done) ->
    Request.get '/not-existing-route'
    .expect 404, done

  it "should response 500 for server error on request", (done) ->

    Request.get '/server-error'
    .expect 500, done

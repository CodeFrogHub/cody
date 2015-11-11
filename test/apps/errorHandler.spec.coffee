describe "Cody Request ErrorHandler", ->
  it "should reponse 404 for not existing route", (done) ->
    Request.get '/not-existing-route'
    .expect 404, done

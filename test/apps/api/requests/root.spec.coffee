describe.skip "Api Requests", ->
  context "GET /api", ->
    it "should reponse 200", (done) ->
      Request.get '/api'
      .expect 200, done

describe "Api Requests", ->
  context "GET /api", ->
    it "should reponse 200", (done) ->
      Request.get '/api'
      .expect 200
      .expect Matcher.responseKeyInBody 'info'
      .expect Matcher.responseKeyInBody 'version'
      .end done

describe "Api Requests", ->
  context "POST /api/auth", ->
    userData =
      email: 'test@test.com'
      password: 'test1234'

    before (done) ->
      User.create userData, done

    after (done) -> User.destroy done

    it "should reponse a token and 200", (done) ->
      Request.post '/api/auth'
      .send 
      	email: userData.email
      	password: userData.password
      .expect Matcher.responseKeyInBody 'token'
      .expect 200
      .end done

    it "should reponse 400 with message 'Wrong credentials'", (done) ->
      Request.post '/api/auth'
      .send 
      	email: 'test'
      .expect (res) ->
      	res.body.should.containEql message: "Wrong credentials"
      .expect 400
      .end done

    it "should reponse 400 with message 'Bad request'", (done) ->
      Request.post '/api/auth'
      .expect (res) ->
      	res.body.should.containEql message: "Bad request"
      .expect 400
      .end done
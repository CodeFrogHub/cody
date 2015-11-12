describe "Service JWT", ->
  subject =
    id: 1

  it "should issue a token for given subject, secret and expire", ->
    token = JwtService.issueToken subject, App.config.jwt.secret, App.config.jwt.expire
    token.should.be.not.eql subject

  it "should verify a token and give the subject", ->
    token = JwtService.issueToken subject, App.config.jwt.secret, App.config.jwt.expire
    verifiedToken = JwtService.verifyToken token, App.config.jwt.secret
    verifiedToken.subject.should.be.eql subject

  it "should throw an error for expired token", ->
    token = JwtService.issueToken subject, App.config.jwt.secret, -10
    ->
      JwtService.verifyToken token, App.config.jwt.secret
      .should.throw()

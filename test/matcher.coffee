should = require 'should'
_ = require 'lodash'

module.exports.unique = (Model, validData, attribute, done) ->
  Model.create validData, (err, model) ->
    should.not.exist err
    return done err if err
    Model.create validData, (err, model) ->
      should.exist err
      err.details.should.containEql attribute
      err.invalidAttributes.should.have.property attribute
      err.invalidAttributes[attribute].should.containDeep [rule: 'unique']
      done()

module.exports.uniqueCaseInsensitive = (Model, validData, attribute, done) ->
  Model.create validData, (err, model) ->
    should.not.exist err
    return done err if err
    validData[attribute] = _.capitalize validData[attribute]
    Model.create validData, (err, model) ->
      should.exist err
      err.details.should.containEql attribute
      err.invalidAttributes.should.have.property attribute
      err.invalidAttributes[attribute].should.containDeep [rule: 'unique']
      done()

module.exports.required = (Model, validData, attribute, done) ->
  validData[attribute] = null
  Model.create validData, (err, model) ->
    should.exist err
    err.details.should.containEql attribute
    err.invalidAttributes.should.have.property attribute
    err.invalidAttributes[attribute].should.containDeep [rule: 'required']
    done()

module.exports.responseKeyInBody = (key) ->
  (res) ->
    return "missing #{key} key" unless key in res.body

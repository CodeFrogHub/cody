_ = require 'lodash'

module.exports = 
  all: (done) ->
    query = this.find()
    .populateAll
      select: ['id']

    query.exec done if _.isFunction done
    return query

  get: (id, done) ->
    query = this.findOneById id
    .populateAll
      select: ['id']

    query.exec done if _.isFunction done
    return query


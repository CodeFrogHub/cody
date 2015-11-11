_ = require 'lodash'

module.exports.defaultAssign = _.partialRight _.assign, (value, other) ->
  if _.isUndefined value then other else value

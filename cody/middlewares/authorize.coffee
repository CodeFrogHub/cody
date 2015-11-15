module.exports = (groups=[]) ->
  (req, res, next) ->
    return res.locals.responseError.forbidden next unless req.user
    
    next() if groups.indexOf(group.name) isnt -1 for group in req.user.groups      
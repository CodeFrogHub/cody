module.exports = 
  index: (req, res, next) ->
    Group.all()
    .then (groups) -> res.json groups
    .catch next

  show: (req, res, next) ->
    Group.get req.params.id
    .populate 'users'
    .then (group) -> res.json group
    .catch next
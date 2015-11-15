module.exports = 
  index: (req, res, next) ->
    User.all()
    .then (users) -> res.json users
    .catch next

  show: (req, res, next) ->
    User.get req.params.id
    .populate 'groups'
    .then (user) -> res.json user
    .catch next

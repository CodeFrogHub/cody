module.exports =
  attributes:
  	name:
  		type: 'string'
  		required: true
  		unique: true
  		lowercase: true
  		alphanumeric: true

  	users:
  		collection: 'user'
  		via: 'groups'
  		dominant: true

  associations: [
    {alias: 'users'}
  ]
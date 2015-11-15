module.exports =
  attributes:
    email:
      type: 'email'
      required: true
      unique: true

    password:
      type: 'string'
      required: true
      minLength: 8

    groups:
      collection: 'group'
      via: 'users'

    changePassword: (newPassword, done) ->
      this.newPassword = newPassword
      this.save done
      
    validatePassword: (password, done) ->
      PasswordService.check password, this.password, done

    toJSON: ->
      obj = this.toObject()
      delete obj.password
      return obj

  associations: [
    {alias: 'groups'}
  ]

  beforeCreate: (values, done) ->
    PasswordService.encrypt values.password, (err, encryptedPassword) ->
      return done err if err
      values.password = encryptedPassword
      done()

  beforeUpdate: (values, done) ->
    if values.newPassword
      PasswordService.encrypt values.password, (err, encryptedPassword) ->
        return done err if err
        values.password = encryptedPassword
        done()
    else
      done()

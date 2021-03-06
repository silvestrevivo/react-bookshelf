'user strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)
const SALT_I = 10

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  name: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
})

// this is ejecuted before the password is sent to be encrypted
// this function is user to register a new user, not to login
UserSchema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_I, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

// Compare password eacht time a new user try to login
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

// Generate token to each time we are logged in.
UserSchema.methods.generateToken = function(callback) {
  var user = this
  var token = jwt.sign(user._id.toHexString(), config.SECRET)

  user.token = token
  // we save the token in the user
  user.save(function(err, user) {
    if (err) return callback(err)
    callback(null, user)
  })
}

// This method helps to the middleware Auth
UserSchema.statics.findByToken = function(token, callback) {
  var user = this

  jwt.verify(token, config.SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return callback(err)
      callback(null, user)
    })
  })
}

UserSchema.methods.deleteToken = function(token, callback) {
  var user = this

  user.updateOne({ $unset: { token: 1 } }, (err, user) => {
    if (err) return callback(err)
    callback(null, user)
  })
}

module.exports = mongoose.model('User', UserSchema)

'user strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)
const SALT_I = 10

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model('User', userSchema)

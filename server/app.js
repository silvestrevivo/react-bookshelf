'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const api = require('./routes')
const cors = require('cors')

// we run the app
const app = express()

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// calling api to use end points
app.use('/api', api)

module.exports = app

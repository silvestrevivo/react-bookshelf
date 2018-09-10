'user strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const api = require('./routes')
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express()
const cors = require('cors')

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// calling api to use end points
app.use('/api', api)

// connecting to data base
app.set('port', process.env.PORT || 3000)
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true },
)

// triggering the app
mongoose.connection
  .once('open', () => {
    // making the app listening to port
    app.listen(app.get('port'), () => {
      console.log(`Server started on port ${app.get('port')}`)
    })
  })
  .on('error', error => {
    return console.warn(`Error connecting to the data base: ${error}`)
  })

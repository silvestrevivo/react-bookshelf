'user strict'

const mongoose = require('mongoose')

// import the app
const app = require('./app')

// file configuration to run server with express
const config = require('./config/config').get(process.env.NODE_ENV)

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

'user strict'

const config = {
  production: {
    SECRET: process.env.SECRET,
    // we are defining the secret in Heroku
    DATABASE: process.env.MONGODB_URI,
    // we take the database from Heroku
  },
  default: {
    SECRET: 'herecomesthepassword',
    // this is used just for development
    DATABASE: 'mongodb://localhost:27017/booksShelf',
    // this is used just for development
  },
}

exports.get = function get(env) {
  return config[env] || config.default
}

'user strict'

const User = require('../models/user')

function Auth(req, res, next) {
  let token = req.cookies.auth

  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user)
      return res.status(404).json({
        error: true,
      })

    req.token = token
    req.user = user
    next()
  })
}

module.exports = Auth

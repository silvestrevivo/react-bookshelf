'user strict'

const User = require('../models/user')

function Auth(req, res, next) {
  let token = req.cookies.auth

  console.log('token', req.cookies.auth)

  User.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user)
      return res.status(400).json({
        isAuth: false,
        // if the user is already logout, this is the message we will see
        // if we try to logout again
      })

    req.token = token
    req.user = user
    next()
  })
}

module.exports = Auth

/*
This middleware is to check is the user is logged in. To do that we have to
check is the token exist => if the session is open
*/

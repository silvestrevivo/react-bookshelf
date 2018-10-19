'user strict'

const User = require('../models/user')
const Book = require('../models/book')

// Register new user
function registerUser(req, res) {
  const user = new User(req.body)

  user.save((err, user) => {
    if (err) return res.status(500).json({ success: false })
    res.status(200).json({
      success: true,
      user,
    })
  })
}

// Login user
function loginUser(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })

    if (!user) return res.status(400).json({ isAuth: false, message: 'Email user not found!' })

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          isAuth: false,
          message: 'Wrong password',
        })

      // if the mail is found and the password matchs, a new token is generated
      // and saved as a cookie in the browser
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(`token not generated: ${err}`)
        res
          .cookie('auth', user.token)
          .status(200)
          .json({
            isAuth: true,
            id: user._id,
            email: user.email,
          })
      })
    })
  })
}

// Get current user of reviewer
function getReviewer(req, res) {
  let id = req.query.id

  User.findById(id, (err, user) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!user) return res.status(404).send({ message: `The user does not exist` })
    res.status(200).json({
      name: user.name,
      lastname: user.lastname,
    })
  })
}

// Get all users
function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!users) return res.status(404).send({ message: 'There is no any users' })

    res.status(200).send(users)
  })
}

// Get all the post from a user
function getUserPost(req, res) {
  Book.find({ ownerId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!docs) return res.status(404).send({ message: 'There is no any docs from that user' })

    res.status(200).send(docs)
  })
}

// Log out user
function logoutUser(req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!user) return res.status(404).send({ message: 'There is not user logged in!' })

    res.sendStatus(200)
  })
}

// Check if a user has the session open
function authUser(req, res) {
  res.status(200).json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  })
}

module.exports = {
  registerUser,
  loginUser,
  getReviewer,
  getAllUsers,
  getUserPost,
  logoutUser,
  authUser,
}

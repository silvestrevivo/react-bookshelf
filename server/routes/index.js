'user strict'

const express = require('express')
const api = express.Router()
const Auth = require('../middleware/auth')
const bookCtrl = require('../controllers/book')
const userCtrl = require('../controllers/user')

// Books //
// POST a book
api.post('/book', bookCtrl.postBook)

// GET a single book by id
api.get('/getbook', bookCtrl.getSingleBook)

// GET all books
api.get('/getbooks', bookCtrl.getAllBooks)

// UPDATE single book
api.put('/book_update', bookCtrl.updateBook)

// DELETE
api.delete('/book_delete', bookCtrl.deleteBook)

// User //
// Register a new new user
api.post('/register', userCtrl.registerUser)

// Login the user
api.post('/login', userCtrl.loginUser)

// GET reviewer or active user
api.get('/getreviewer', userCtrl.getReviewer)

// GET all users
api.get('/users', userCtrl.getAllUsers)

// GET user posts or particular user
api.get('/user_posts', userCtrl.getUserPost)

// logout
// Auth is a middleware to know if the user is logged in
api.get('/logout', Auth, userCtrl.logoutUser)

// Authentication => to protect the urls
// We use this end point to know if a user session is running
api.get('/auth', Auth, userCtrl.authUser)

module.exports = api

'user strict'

const express = require('express')
const api = express.Router()
const User = require('../models/user')
const Book = require('../models/book')

// Book routes
// get single book by id
api.get('/getbook', (req, res) => {
  let id = req.query.id

  Book.findById(id, (err, doc) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!doc) return res.status(404).send({ message: `The product does not exist` })
    res.status(200).send({ doc })
  })
})

// get all books
api.get('/getbooks', (req, res) => {
  let skip = parseInt(req.query.skip)
  let limit = parseInt(req.query.limit)
  let order = req.query.order

  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
      if (!doc) return res.status(404).send({ message: `The product does not exist` })
      res.status(200).send({ doc })
    })
})

//post a new book
api.post('/book', (req, res) => {
  const book = new Book(req.body)

  book.save((err, doc) => {
    if (err) return res.status(500).send({ message: `Error saving in the DB: ${err} ` })
    res.status(200).json({
      post: true,
      bookId: doc._id,
    })
  })
})

//update
api.post('/book_update', (req, res) => {
  let bookId = req.body._id
  let update = req.body

  Book.findByIdAndUpdate(bookId, update, { new: true }, (err, docUpdated) => {
    if (err) res.status(500).send({ message: `Error trying to update product: ${err}` })

    res.status(200).json({
      succes: true,
      docUpdated,
    })
  })
})

//delete
api.delete('/book_delete', (req, res) => {
  let id = req.query.id

  Book.findById(id, (err, bookDeleted) => {
    if (err) res.status(500).send({ message: `Error in the request: ${err}.` })

    bookDeleted.remove(err => {
      if (err) res.status(500).send({ message: `Error trying to delete product: ${err}` })

      res.status(200).send({ message: `The product was succesfully deleted` })
    })
  })
})

// User routes
// register a new new user
api.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, doc) => {
    if (err) res.status(500).send({ message: `Error creating user: ${err}` })
    res.status(200).json({
      succes: true,
      user: doc,
    })
  })
})

// login
api.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).send({ message: `Error in the request: ${err}.` })

    if (!user) return res.status(404).json({ isAuth: false, message: 'Email not found!' })

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: 'Wrong password',
        })

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
})

module.exports = api

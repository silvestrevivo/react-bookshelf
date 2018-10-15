'use strict'

const Book = require('../models/book')

// Post a book //
function postBook(req, res) {
  const book = new Book(req.body)

  book.save((err, doc) => {
    if (err) return res.status(500).send({ message: `Error saving in the DB: ${err} ` })
    res.status(200).json({
      post: true,
      bookId: doc._id,
    })
  })
}

// Get single book
function getSingleBook(req, res) {
  let id = req.query.id

  Book.findById(id, (err, doc) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!doc) return res.status(404).send({ message: `The book does not exist` })
    res.status(200).send(doc)
  })
}

// Get all books
function getAllBooks(req, res) {
  let skip = parseInt(req.query.skip)
  let limit = parseInt(req.query.limit)
  let order = req.query.order

  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
      if (!doc) return res.status(404).send({ message: `The book does not exist` })
      res.status(200).send(doc)
    })
}

// Update Book
function updateBook(req, res) {
  let bookId = req.body._id
  let update = req.body

  Book.findByIdAndUpdate(bookId, update, { new: true }, (err, docUpdated) => {
    if (err) return res.status(500).send({ message: `Error trying to update product: ${err}` })
    if (!bookId) return res.status(404).send({ message: `The book does not exist` })
    res.status(200).json({
      success: true,
      docUpdated,
    })
  })
}

// Delete book
function deleteBook(req, res) {
  let id = req.query.id

  Book.findById(id, (err, bookDeleted) => {
    if (err) res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!bookDeleted) res.status(404).send({ message: `The book does not exist` })

    bookDeleted.remove(err => {
      if (err) res.status(500).send({ message: `Error trying to delete product: ${err}` })

      res.status(200).json(true)
    })
  })
}

module.exports = {
  postBook,
  getSingleBook,
  getAllBooks,
  updateBook,
  deleteBook,
}

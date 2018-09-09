'user strict'

const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      default: 'n/a',
    },
    pages: {
      type: String,
      default: 'n/a',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    price: {
      type: String,
      default: 'n/a',
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, //we register when is the first time writen and updated
)

module.exports = mongoose.model('Book', bookSchema)

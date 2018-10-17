import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

class Add extends Component {
  state = {
    formdata: {
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
  }

  handleInput = event => {
    const newFormdata = {
      ...this.state.formdata,
    }
    newFormdata[event.target['name']] = event.target.value
    this.setState({
      formdata: newFormdata,
    })
  }

  showNewBook = book =>
    book.post ? (
      <div className="conf_link">
        Cool!! <Link to={`/books/${book.bookId}`}>Click the link to see the post</Link>
      </div>
    ) : null

  submitForm = e => {
    e.preventDefault()
    const { addBook, user } = this.props
    const { formdata } = this.state
    addBook({ ...formdata, ownerId: user.login.id })
  }

  componentWillUnmount() {
    const { clearNewBook } = this.props
    clearNewBook()
  }

  render() {
    let {
      formdata: { name, author, review, pages, price, rating },
    } = this.state

    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Add a review</h2>
          <div className="form_element">
            <input type="text" name="name" placeholder="Enter name" value={name} onChange={this.handleInput} />
          </div>
          <div className="form_element">
            <input type="text" name="author" placeholder="Enter author" value={author} onChange={this.handleInput} />
          </div>
          <textarea value={review} name="review" onChange={this.handleInput} />
          <div className="form_element">
            <input type="number" name="pages" placeholder="Enter pages" value={pages} onChange={this.handleInput} />
          </div>
          <div className="form_element">
            <select value={rating} name="rating" onChange={this.handleInput}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input type="number" name="price" placeholder="Enter price" value={price} onChange={this.handleInput} />
          </div>
          <button type="submit">Add review</button>
          {this.props.books.newbook ? this.showNewBook(this.props.books.newbook) : null}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
  }
}

export default connect(
  mapStateToProps,
  actions,
)(Add)

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

class Edit extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
  }

  componentDidMount() {
    const { getBook, match } = this.props
    getBook(match.params.id)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return prevProps.books !== this.props.books
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const {
        books: { book },
      } = this.props
      this.setState({
        formdata: {
          _id: book._id,
          name: book.name,
          author: book.author,
          review: book.review,
          pages: book.pages,
          rating: book.rating,
          price: book.price,
        },
      })
    }
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

  submitForm = e => {
    e.preventDefault()
    const { updateBook } = this.props
    const { formdata } = this.state
    updateBook(formdata)
  }

  deletePost = () => {
    const { deleteBook, match } = this.props
    deleteBook(match.params.id)
  }

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push('/user/user-reviews')
    }, 1000)
  }

  componentWillUnmount() {
    const { clearBook } = this.props
    clearBook()
  }

  render() {
    let {
      formdata: { name, author, review, pages, price, rating },
    } = this.state
    const { books } = this.props
    return (
      <div className="rl_container article">
        {books.updateBook ? (
          <div className="edit_confirm">
            post updated, <Link to={`/books/${books.book._id}`}>Click here to see your post</Link>
          </div>
        ) : null}

        {books.postDeleted ? (
          <div className="red_tag">
            Post Deleted
            {this.redirectUser()}
          </div>
        ) : null}
        <form onSubmit={this.submitForm}>
          <h2>Edit review</h2>
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
          <button type="submit">Edit review</button>
          <div className="delete_post">
            <div className="button" onClick={this.deletePost}>
              Delete review
            </div>
          </div>
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
)(Edit)

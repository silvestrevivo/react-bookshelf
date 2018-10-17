import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions/index'
import BookItem from '../widgetsUI/BookItem'

class HomeContainer extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getBooks } = this.props
    getBooks(1, 0, 'desc')
  }

  renderItems = () => {
    const { books } = this.props
    return !books.list ? null : books.list.map(item => <BookItem {...item} key={item._id} />)
  }

  loadmore = () => {
    const { getBooks, books } = this.props
    const count = books.list.length
    getBooks(1, count, 'desc', books.list)
  }

  render() {
    return (
      <div>
        <div>{this.renderItems()}</div>
        <div className="loadmore" onClick={this.loadmore} role="presentation">
          Load More
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books,
})

export default connect(
  mapStateToProps,
  actions,
)(HomeContainer)

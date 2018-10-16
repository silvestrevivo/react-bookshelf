import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class BookView extends Component {
  static propTypes = {
    getBooksWithReviewer: PropTypes.func.isRequired,
    clearBooksWithReviewer: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    books: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getBooksWithReviewer, match } = this.props;
    getBooksWithReviewer(match.params.id);
  }

  componentWillUnmount() {
    const { clearBooksWithReviewer } = this.props;
    clearBooksWithReviewer();
  }

  renderBook = books =>
    books.book ? (
      <div className="br_container">
        <div className="br_header">
          <h2>{books.book.name}</h2>
          <h5>{books.book.author}</h5>
          <div className="br_reviewer">
            <span>Review by:</span> {books.reviewer.name} {books.reviewer.lastname}
          </div>
        </div>
        <div className="br-review">{books.book.review}</div>
        <div className="br_box">
          <div className="left">
            <div>
              <span>Pages: </span> {books.book.pages}
            </div>
            <div>
              <span>Price: </span> {books.book.price}
            </div>
          </div>
          <div className="right">
            <span>Rating</span>
            <div>{books.book.rating} / 5</div>
          </div>
        </div>
      </div>
    ) : null;

  render() {
    console.log('props', this.props);
    const { books } = this.props;
    return <div>{this.renderBook(books)}</div>;
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(
  mapStateToProps,
  actions
)(BookView);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';

class HomeContainer extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getBooks } = this.props;
    getBooks();
  }

  renderItems = () => {
    const { books } = this.props;
    return !books.list ? null : books.list.map((item, i) => <li key={i}>{item.name}</li>);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>{this.renderItems()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(
  mapStateToProps,
  actions
)(HomeContainer);

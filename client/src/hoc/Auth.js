import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default function(ComposedClass) {
  class Auth extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      const { auth } = this.props;
      console.log('componentDidMount');
      auth();
    }

    render() {
      console.log(this.props);
      const { loading } = this.state;
      if (loading) {
        return <div className="loader">Loading...</div>;
      }
      return <ComposedClass {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user,
  });

  return connect(
    mapStateToProps,
    actions
  )(Auth);
}

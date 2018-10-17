import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export default function(ComposedClass) {
  class Auth extends Component {
    state = {
      loading: true,
    }

    componentDidMount() {
      const { auth } = this.props
      auth()
    }

    render() {
      const { user } = this.props
      if (user.login) {
        if (user.login.isAuth) {
          return <ComposedClass {...this.props} />
        }
      }
      return <div className="loader">Loading...</div>
    }
  }

  const mapStateToProps = state => ({
    user: state.user,
  })

  return connect(
    mapStateToProps,
    actions,
  )(Auth)
}

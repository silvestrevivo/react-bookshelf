import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export default function(ComposedClass, reload) {
  class Auth extends PureComponent {
    state = {
      loading: true,
    }

    componentDidMount() {
      const { auth } = this.props
      auth()
    }

    componentDidUpdate() {
      const { user, history } = this.props
      this.setState({ loading: false })

      if (!user.login.isAuth) {
        //*if user is not logged

        if (reload) {
          history.push('/login')
        }
      } else {
        if (reload === false) {
          history.push('/user')
        }
      }
    }

    render() {
      const { loading } = this.state
      if (loading) {
        return <div className="loader">Loading...</div>
      } else {
        return <ComposedClass {...this.props} user={this.props.user} />
      }
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

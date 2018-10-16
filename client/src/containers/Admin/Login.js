import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
    success: false,
  };

  componentDidUpdate(prevProps) {
    const { user, history } = this.props;
    if (prevProps.user !== user) {
      if (user.login.isAuth) {
        history.push('/user');
      }
    }
  }

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleInputPassword = event => {
    this.setState({ password: event.target.value });
  };

  submitForm = e => {
    const { loginUser } = this.props;
    e.preventDefault();
    loginUser(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>
          <div className="form_element">
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Log in</button>
          <div className="error">{user.login ? <div>{user.login.message}</div> : null}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  actions
)(Login);

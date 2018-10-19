import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Register extends PureComponent {
  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: '',
  }

  componentDidMount() {
    const { getUsers } = this.props
    getUsers()
  }

  handleInput = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  showUsers = user =>
    user.users
      ? user.users.map(item => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
          </tr>
        ))
      : null

  componentDidUpdate() {
    console.log('componentDidUpdate', this.props.user.register)
    if (this.props.user.register) {
      this.setState({
        name: '',
        lastname: '',
        email: '',
        password: '',
      })
    } else if (this.props.user.register === false) {
      this.setState({
        error: 'Error, try again',
      })
    }
  }

  submitForm = e => {
    e.preventDefault()
    this.setState({ error: '' })
    const { userRegister, user } = this.props
    const { name, lastname, email, password } = this.state
    userRegister({ name, lastname, email, password }, user.users)
  }

  render() {
    //console.log(this.props)
    const { user } = this.props
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Add user</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter lastname"
              value={this.state.lastname}
              name="lastname"
              onChange={this.handleInput}
            />
          </div>
          <div className="form_element">
            <input
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              name="email"
              onChange={this.handleInput}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
            />
          </div>
          <button type="submit">Add user</button>
          <div className="error">{this.state.error}</div>
        </form>
        <div className="current_users">
          <h4>Current users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.showUsers(user)}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  actions,
)(Register)

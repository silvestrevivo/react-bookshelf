import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment-js'
import { Link } from 'react-router-dom'

class UserPosts extends Component {
  componentDidMount() {
    const { getUserPosts, user } = this.props
    getUserPosts(user.login.id)
  }

  showUserPosts = user =>
    user.userPosts
      ? user.userPosts.map(item => (
          <tr key={item._id}>
            <td>
              <Link to={`/user/edit-post/${item._id}`}>{item.name}</Link>
            </td>
            <td>{item.author}</td>
            <td>{moment(item.createAt).format('MM/DD/YY')}</td>
          </tr>
        ))
      : null

  render() {
    const { user } = this.props
    return (
      <div className="user_posts">
        <h4>Your reviews:</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.showUserPosts(user)}</tbody>
        </table>
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
)(UserPosts)

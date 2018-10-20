import React from 'react'
import axios from 'axios'

const Logout = props => {
  const logginout = () => {
    axios.get('/api/logout').then(request => {
      setTimeout(() => {
        props.history.push('/')
      }, 2000)
    })
  }

  return (
    <div className="logout_container">
      <h1>Sorry to see you go :(</h1>
      {logginout()}
    </div>
  )
}

export default Logout

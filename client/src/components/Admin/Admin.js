import React from 'react'
import img from '../../../src/avatar.png'

const Admin = ({ user }) => {
  const { email, lastname, name } = user.login
  return (
    <div className="user_container">
      <div className="avatar">
        <img src={img} alt="avatar" />
      </div>
      <div className="nfo">
        <div>
          <span>Name:</span> {name}
        </div>
        <div>
          <span>Lastname:</span> {lastname}
        </div>
        <div>
          <span>Email:</span> {email}
        </div>
      </div>
    </div>
  )
}

export default Admin

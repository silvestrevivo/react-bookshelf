import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

const SidenavItems = ({ user }) => {
  console.log(user)
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'user',
      text: 'My Profile',
      link: '/user',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'unlock',
      text: 'Add Admin',
      link: '/user/register',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'location-arrow',
      text: 'Login',
      link: '/login',
      restricted: false,
      exclude: true,
    },
    {
      type: 'navItem',
      icon: 'book',
      text: 'My reviews',
      link: '/user/user-reviews',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'plus-circle',
      text: 'Add reviews',
      link: '/user/add',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'location-arrow',
      text: 'Logout',
      link: '/user/logout',
      restricted: true,
    },
  ]

  const showItems = () =>
    user.login
      ? items.map((item, i) => {
          if (user.login.isAuth) {
            return !item.exclude ? element(item, i) : null
          } else {
            return !item.restricted ? element(item, i) : null
          }
        })
      : null

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  )

  return <div>{showItems()}</div>
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(SidenavItems)

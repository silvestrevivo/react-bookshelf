import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = () => {
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
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'unlock',
      text: 'Add Admin',
      link: '/user/register',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'location-arrow',
      text: 'Login',
      link: '/login',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'book',
      text: 'My reviews',
      link: '/user/user-reviews',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'plus-circle',
      text: 'Add reviews',
      link: '/user/add',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'location-arrow',
      text: 'Logout',
      link: '/user/logout',
      restricted: false,
    },
  ];

  const showItems = () =>
    items.map((item, i) => (
      <div key={i} className={item.type}>
        <Link to={item.link}>
          <FontAwesome name={item.icon} />
          {item.text}
        </Link>
      </div>
    ));

  return <div>{showItems()}</div>;
};

export default SidenavItems;

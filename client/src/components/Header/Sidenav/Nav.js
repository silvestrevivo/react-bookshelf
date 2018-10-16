import React from 'react';
import SideNav from 'react-simple-sidenav';
import PropTypes from 'prop-types';
import SidenavItems from './SidenavItems';

const Nav = ({ showNav, onHideNav }) => (
  <SideNav
    showNav={showNav}
    onHideNav={onHideNav}
    navStyle={{
      background: '#242424',
      maxWidth: '220px',
    }}
  >
    <SidenavItems />
  </SideNav>
);

Nav.propTypes = {
  showNav: PropTypes.bool.isRequired,
  onHideNav: PropTypes.func.isRequired,
};

export default Nav;

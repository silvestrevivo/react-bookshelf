import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './Sidenav/Nav';

class Header extends Component {
  state = {
    showNav: false,
  };

  onHideNav = () => {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav,
    });
  };

  render() {
    const { showNav } = this.state;
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            style={{
              color: '#ffffff',
              padding: '10px',
              cursor: 'pointer',
            }}
            onClick={this.onHideNav}
          />
        </div>
        <Nav showNav={showNav} onHideNav={() => this.onHideNav()} />
        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    );
  }
}

export default Header;

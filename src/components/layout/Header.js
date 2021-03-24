import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
      <header style={headerstyle}>
          <h1>IoT Sääasema</h1>
          <Link to="/" style={linkstyle}>Sääasema</Link> <Link to="/portfolio" style={linkstyle}>Portfolio</Link>
          </header>
    )
}
const linkstyle = {
  color: '#ffffff',
  textdecoration: 'none'
}
const headerstyle = {
  background: '#333333',
  color: '#ffffff',
  textAling: 'center',
  padding: '10px'
}
export default Header;
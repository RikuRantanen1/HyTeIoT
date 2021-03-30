import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
      <header style={headerstyle}>
         
           <h1>IoT Sääasema</h1>
          <Link to="/" style={linkstyle}>Sääasema</Link>  <Link to="/portfolio" style={linkstyle}>Portfolio</Link>  <Link to="/Toivomukset" style={linkstyle}>Toivomukset</Link><p></p>
          <a href="https://github.com/RikuRantanen1/HyTeIoT/blob/master/README.md" target="blank" rel="noopener norefferer">ReadMe</a>
          </header>
    )
}
const linkstyle = {
  color: '#ffffff',
  textdecoration: 'none'
}
const headerstyle = {
  background: '#0000FF',
  color: '#ffffff',
  textAling: 'center',
  padding: '10px'
}
export default Header;
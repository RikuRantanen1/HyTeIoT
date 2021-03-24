import React from 'react';

function Header() {
    return (
      <header style={headerstyle}>
          <h1>IoT Sääasema</h1>
          </header>
    )
}

const headerstyle = {
  background: '#333333',
  color: '#ffffff',
  textAling: 'center',
  padding: '10px'
}
export default Header;
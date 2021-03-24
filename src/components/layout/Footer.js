import React from 'react';

function Footer() {
    return (
      <footer style={footerstyle}>
          <h3>R.R</h3>
          </footer>
    )
}

const footerstyle = {
 
  background: '#333333',
  color: '#ffffff',
  textAling: 'center',
  padding: '10px',
  position: 'fixed',
  bottom: '0px',
  width: '100%'
  
}
export default Footer;
import React from 'react';

function Footer() {
    return (
      <footer style={footerstyle}>
      <div>
          <h3>&copy; R.R</h3>
          </div>
          </footer>
    )
}

const footerstyle = {
 
  background: '#0000FF',
  color: '#ffffff',
  textAling: 'center',
  padding: '0px',
  position: 'fixed',
  bottom: '0px',
  width: '100%'
  
}
export default Footer;
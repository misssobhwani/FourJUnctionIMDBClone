import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="hamburger">
        &#9776;
      </div>
      <h1 className="title">IMDB Clone</h1>
      <button className="signin-button">Sign In</button>
    </header>
  )
}

export default Header
import React from 'react'

//styles
import './Header.css'

const Header = props => {

  const handleLogout = e => {
    localStorage.removeItem('authToken')
    window.location.assign('/')
  }

  return (
    <div className="header">
      <div className="brand">Qualitia Build Download</div>
      {
        props.isAuthenticated && (
          <div className="logout-button">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )
      }
    </div>
  )
}

export default Header

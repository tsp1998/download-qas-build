import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// components
import FileManager from '../components/FileManager'

//styles
import './IndexPage.css'

const IndexPage = (props) => {

  const handleLoginClick = userType => {
    props.history.push(`/auth?userType=${userType}`)
  }

  return (
    <div className="index-page container">
      {
        props.isAuthenticated ?
          <FileManager /> :
          <div className="login-button-container">
            <button onClick={() => handleLoginClick('user')}>Login as Qualitia User</button>
            <button onClick={() => handleLoginClick('client')}>Login as Qualitia Client</button>
          </div>
      }
    </div>
  )
}

export default withRouter(IndexPage)

import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';

//components
import Loader from '../components/Loader';

//apis
import { loginWithJira } from '../apis/jiraApis'

//styles
import './AuthPage.css'

const AuthPage = (props) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    const { history: { location: { search } } } = props;
    const userType = search.substring(search.indexOf('='))
    setIsLoading(true)
    try {
      const authToken = await loginWithJira(userType);
      if (authToken) {
        localStorage.setItem('authToken', authToken);
        props.setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(`error`, error)
    }
    setIsLoading(false)
    props.history.push('/')
  }, [])

  return (
    <div className="auth-page container">
      <div className="text-bold">Auth Page</div>
      {isLoading ? <Loader /> : null}
    </div>
  )
}

export default withRouter(AuthPage)

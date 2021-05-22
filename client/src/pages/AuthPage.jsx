import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';

//components
import Loader from '../components/Loader';

//apis
import { loginWithJira } from '../apis/jiraApis'

//utils
import getQueryParams from '../utils/getQueryParams'

//styles
import './AuthPage.css'

const AuthPage = (props) => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () => {
    const { history: { location: { search } } } = props;
    const queryParams = getQueryParams(search)
    setIsLoading(true)

    try {
      const authToken = await loginWithJira(queryParams.userType);
      if (authToken) {
        localStorage.setItem('authToken', authToken);
        props.setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(`error`, error)
    }

    setIsLoading(false)
    const redirectPath = localStorage.getItem('redirectPath') || '/'
    props.history.push(redirectPath)
  }, [])

  return (
    <div className="auth-page container">
      <div className="text-bold">Auth Page</div>
      {isLoading ? <Loader /> : null}
    </div>
  )
}

export default withRouter(AuthPage)

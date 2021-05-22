import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//pages
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';

//components
import Header from './components/Header';

//styles
import './App.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsAuthenticated(true);
    }
  }, [])

  const handleLogout = e => {
    localStorage.removeItem('authToken')
    window.location.assign('/')
  }

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Router>
        <Route
          exact
          path="/"
          render={props => (
            <IndexPage
              {...props}
              isAuthenticated={isAuthenticated}
            />
          )}
        />
        <Route path="/auth" render={props => (
          <AuthPage {...props} setIsAuthenticated={setIsAuthenticated} />
        )} />
      </Router>
    </div>
  );
}

export default App;

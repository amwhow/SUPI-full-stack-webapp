import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Dashboard from './components/dashboard_folder/Dashboard'
import NewUser from './components/user/NewUser'
import Login from './components/user/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    // if not logged in , show log in page, else show dashboard page
    <Router >
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <Switch>  
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router >
  );
}

export default App;

import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Dashboard from './components/dashboard_folder/Dashboard'
import NewUser from './components/dashboard_folder/user/NewUser'
import Login from './components/dashboard_folder/user/Login'

function App() {
  return (
    // if not logged in , show log in page, else show dashboard page
    <Router >
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <Switch>  
        <Route exact path="/" component={Dashboard} />
        <Route path="/signup" component={NewUser} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router >
  );
}

export default App;

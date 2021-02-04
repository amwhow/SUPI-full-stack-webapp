import { React, useState, useEffect, useContext } from 'react'
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from './components/user/Login'
<<<<<<< HEAD
import NewSupplier from './components/supplier/NewSupplier'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    // if not logged in , show log in page, else show dashboard page
    <Router >
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/suppliers/new">New Supplier</Link></li>
      </ul>
=======
import LoggedOutNav from './components/user/LoggedOutNav'
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"

function App() {
>>>>>>> master

  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
<<<<<<< HEAD
        <ProtectedRoute exact path="/suppliers/new" component={NewSupplier} />
=======
        <Route exact path="/" component={Home} />
>>>>>>> master
      </Switch>
    </div>
  );
}

export default App;

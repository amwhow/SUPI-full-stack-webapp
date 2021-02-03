import { React, useState, useEffect, useContext } from 'react'
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from './components/user/Login'
import LoggedOutNav from './components/user/LoggedOutNav'
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"

function App() {

  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;

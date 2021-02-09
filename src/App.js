import { React, useState, useEffect, useContext } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import ContactForm from "./components/info/Contact";
import About from "./components/info/About";


function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={ContactForm} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;

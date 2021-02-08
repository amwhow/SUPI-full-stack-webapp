import { React, useState, useEffect, useContext } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import NewSupplier from './components/supplier/NewSupplier'
import EditSupplier from './components/supplier/EditSupplier'

import NewReview from './components/review/NewReview'


function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/dashboard/suppliers/new" component={NewSupplier} />
        <ProtectedRoute
          exact
          path="/dashboard/suppliers/edit/:id"
          component={EditSupplier}
        />
        
        <ProtectedRoute exact path="/dashboard/purchase_orders/:id/reviews/new" component={NewReview} />
      </Switch>
    </div>
  );
}

export default App;

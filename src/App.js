import { React, useState, useEffect, useContext } from 'react'
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from './components/user/Login'
import LoggedOutNav from './components/user/LoggedOutNav'
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import NewSupplier from './components/supplier/NewSupplier'
import NewInvoice from './components/invoice/NewInvoice'
import NewPO from './components/PO/NewPO'
import NewReview from './components/review/NewReview'
import NewDocument from './components/document/NewDocument'

function App() {

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/suppliers/new" component={NewSupplier} />
        <ProtectedRoute exact path="/invoices/new" component={NewInvoice} />
        <ProtectedRoute exact path="/po/new" component={NewPO} />
        <ProtectedRoute exact path="/review/new" component={NewReview} />
        <ProtectedRoute exact path="/document/new" component={NewDocument} />
      </Switch>
    </div>
  );
}

export default App;

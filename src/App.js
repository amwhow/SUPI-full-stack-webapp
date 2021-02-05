import { React, useState, useEffect, useContext } from 'react'
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from './components/user/Login'
import LoggedOutNav from './components/user/LoggedOutNav'
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import NewSupplier from './components/supplier/NewSupplier'
import NewPO from './components/PO/NewPO'
import NewDocument from './components/document/NewDocument'
import NewReview from './components/review/NewReview'
import NewInvoice from './components/invoice/NewInvoice'
import CustomizedTables from './components/table/POTable'


function App() {

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/suppliers/new" component={NewSupplier} />
        <ProtectedRoute exact path="/purchase_orders/new" component={NewPO} />
        <ProtectedRoute exact path="/documents/new" component={NewDocument} />
        <ProtectedRoute exact path="/purchase_orders" component={CustomizedTables} />
        <ProtectedRoute exact path="/purchase_orders/:id/reviews/new" component={NewReview} />
        <ProtectedRoute exact path="/purchase_orders/:id/invoices/new" component={NewInvoice} />
      </Switch>
    </div>
  );
}

export default App;

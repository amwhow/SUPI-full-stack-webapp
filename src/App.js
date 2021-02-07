import { React, useState, useEffect, useContext } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./components/user/Login";
import Dashboard from "./components/dashboard_folder/Dashboard";
import NewUser from "./components/user/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import NewSupplier from './components/supplier/NewSupplier'
import EditSupplier from './components/supplier/EditSupplier'
import NewPO from './components/PO/NewPO'
import NewDocument from './components/document/NewDocument'
import NewReview from './components/review/NewReview'
import NewInvoice from './components/invoice/NewInvoice'
import POTable from './components/table/POTable'
import InvoiceTable from './components/table/InvoiceTable'
import DocumentTable from './components/table/DocumentTable'
import { Line } from "@reactchartjs/react-chart.js";


function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/suppliers/new" component={NewSupplier} />
        <ProtectedRoute
          exact
          path="/suppliers/edit/:id"
          component={EditSupplier}
        />
        <ProtectedRoute exact path="/purchase_orders/new" component={NewPO} />
        <ProtectedRoute exact path="/documents/new" component={NewDocument} />
        <ProtectedRoute exact path="/purchase_orders" component={POTable} />
        <ProtectedRoute exact path="/invoices" component={InvoiceTable} />
        <ProtectedRoute exact path="/documents" component={DocumentTable} />
        <ProtectedRoute exact path="/purchase_orders/:id/reviews/new" component={NewReview} />
        <ProtectedRoute exact path="/purchase_orders/:id/invoices/new" component={NewInvoice} />
      </Switch>
    </div>
  );
}

export default App;

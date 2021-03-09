import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Dashboard from "../dashboard_folder/Dashboard";
import NewUser from "./NewUser";
import ProtectedRoute from "../ProtectedRoute";
import Login from "./Login";

export default function Nav() {
  let history = useHistory();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>

      <Switch>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={NewUser} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

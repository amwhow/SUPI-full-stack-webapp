import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { exact, path, component } = props;
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          const jwt = localStorage.getItem("token");
          localStorage.setItem("token", jwt);
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        console.error(err.message);
        alert("Can't connect to backend server");
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  if (!loading && !auth) {
    return <Redirect to="/" />;
  } else {
    return (
      !loading && (
        <>
          <Route exact={exact} path={path} component={component} />
        </>
      )
    );
  }
}

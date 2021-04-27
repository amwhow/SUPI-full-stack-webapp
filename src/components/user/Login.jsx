import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Form, Container } from "../styles/Form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status >= 400) {
        const { error } = await response.json();
        alert(new Error(error)) ;
        return false;
      } else {
        const { user_name, jwt } = await response.json();
        localStorage.setItem("token", jwt);
        localStorage.setItem("user_name", user_name);
        history.push("/dashboard");
        alert("Logged in Successfully!");
      }
    } catch (e) {
      setErrMessage(e.message);
    }
  }

  return (
    <Grid item xs={12} sm={4} style={{ fontSize: "1.5em" }}>
      {errMessage && <span>{errMessage}</span>}
      <Container className="form-container">
        <h2>Log In</h2>
        <Form className="login-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="submit"
              id="submit"
            >
              Login
            </Button>
          </div>
        </Form>
        <p>
          Don't have an account? <Link to="signup">Sign up here</Link>
        </p>
      </Container>
    </Grid>
  );
}

export default Login;

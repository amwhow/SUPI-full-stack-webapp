import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Form, Container } from "../styles/Form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LoggedOutNav from "./LoggedOutNav";


function Login({ history }) {
  // const classes = useStyles();

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
        throw new Error("invalid authentication");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        history.push("/dashboard");
        alert("Logged in Successfully!");
      }
    } catch (e) {
      setErrMessage(e.message);
    }
  }

  return (
    <Grid item xs={12} sm={5}>
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

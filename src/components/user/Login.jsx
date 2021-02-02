import React, { useState } from "react";

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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("invalid authentication");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        history.push("/dashboard");
        alert("Logged in Successfully!")
      }
    } catch (e) {
      setErrMessage(e.message);
    }
  }

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      {errMessage && <span>{errMessage}</span>}
      <form className="login-form" onSubmit={onFormSubmit}>
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
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Login;

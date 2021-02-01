import React, {useState} from "react"
import supiAPI from "../../config/api";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");


  // This is where we need to handle the data
  // I've started with the axios method but it's not implemented properly
  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      auth: { email, password }
    }
    try {
      const response = await supiAPI.get('/login')
    }
  }
  
  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form className="login-form" onSubmit={onFormSubmit} >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} />
        <input type="submit" value="Login" id="submit" />
      </form>
    </div>

  )
}

export default Login
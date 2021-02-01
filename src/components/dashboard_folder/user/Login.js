import React, {useState} from "react"

function Login() {
  const initialFormState = {
    email: "",
    password: ""
  }

  const [formCredentials, setFormCredentials] = useState(initialFormState)

  function onFormSubmit(event) {

  }

  function onInputChange(event) {
    setFormCredentials({
      ...formCredentials,
      [event.target.name]: event.target.value
    })
    console.log(formCredentials.email)
  }
  
  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form className="login-form" onSubmit={onFormSubmit} >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formCredentials.email} onChange={onInputChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={formCredentials.password} onChange={onInputChange} />
        <input type="submit" value="Login" id="submit" />
      </form>
    </div>

  )
}

export default Login
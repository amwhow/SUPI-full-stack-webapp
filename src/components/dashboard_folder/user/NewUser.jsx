import React, {useState} from "react"
import {useHistory} from 'react-router-dom'

// I took this from Alex implementation in the Rails/React integration video
// He set up an authServices component with helper methods to be used here
// We might not need it though
import { signUp } from "../../../services/authServices";

function NewUser() {
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    company_name: "",
    logo: ""
  }

  const [formState, setFormState] = useState(initialFormState);
  let history = useHistory();
  
  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  // This is where we need to handle
  function handleSignUp(event) {
    event.preventDeafault()
    signUp(formState)
    .then((user) => {
      
    })
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={formState.username} onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formState.email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={formState.password} onChange={handleChange}/>
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" id="password_confirmation" value={formState.password_confirmation} onChange={handleChange}/>
        <label htmlFor="company_name">Company Name</label>
        <input type="text" name="company_name" id="company_name" value={formState.company_name} onChange={handleChange}/>
        <label htmlFor="logo">Company Logo</label>
        <input type="file" name="logo" id="logo" value={formState.logo} onChange={handleChange}/>
        <input type="submit" value="Sign Up" id="submit" />
      </form>
    </div>

  )
}

export default NewUser
import React, { useReducer } from "react";
import reducer from '../../utils/reducer'

function NewUser ({ history }) {
  
  // each time a column of the sign-up form is filled, we set the state to that value instead of pushing it to an state array
  const initialState = {
    email: "",
    password: "",
    password_confirmation: "",
    user_name: "",
    company_name: "",
    logo: "",
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const {email, password, user_name, company_name, password_confirmation, logo} = store

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value
    })
    // console.log(e.target.name)
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { user: {email, password, user_name, company_name, password_confirmation} }
    // , logo
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("invalid authentication");
      } else {
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ auth: { email, password } }),
        });
        const { jwt } = await response.json();
        console.log(jwt)
        localStorage.setItem("token", jwt);
        history.push("/login");
        alert("You have signed up!")
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={onFormSubmit}>
        <label htmlFor="user_name">Username</label>
        <input type="text" name="user_name" id="user_name" value={user_name} onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={handleChange}/>
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" id="password_confirmation" value={password_confirmation} onChange={handleChange}/>
        <label htmlFor="company_name">Company Name</label>
        <input type="text" name="company_name" id="company_name" value={company_name} onChange={handleChange}/>
        {/* <label htmlFor="logo">Company Logo</label> */}
        {/* <input type="file" name="logo" id="logo" value={logo} onChange={handleChange}/> */}
        <input type="submit" value="Sign Up" id="submit" />
      </form>
    </div>

  )
}
export default NewUser
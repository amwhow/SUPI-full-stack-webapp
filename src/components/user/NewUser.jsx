import React, { useReducer } from "react";
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import Button from "@material-ui/core/Button";
import LoggedOutNav from "./LoggedOutNav";
import FormContainer from "../styles/FormContainer";

function NewUser({ history }) {
  const initialState = {
    email: "",
    password: "",
    password_confirmation: "",
    user_name: "",
    company_name: "",
    logo: "",
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const {
    email,
    password,
    user_name,
    company_name,
    password_confirmation,
    logo,
  } = store;

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value,
    });
  };

  const handleFile = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.files[0],
    });
  };

  async function onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("user_name", user_name);
    formData.append("company_name", company_name);
    formData.append("password_confirmation", password_confirmation);
    formData.append("logo", logo);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/sign_up`,
        {
          method: "POST",
          headers: {},
          body: formData,
        }
      );
      if (response.status >= 400) {
        throw new Error("invalid authentication");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth: { email, password } }),
          }
        );
        const { user_name, jwt } = await response.json();
        history.push("/");
        alert("You have signed up!");
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <div>
      <LoggedOutNav />
      {/* new user form */}
      <FormContainer>
        <Grid item xs={12} sm={8}>
          <div className="form-container">
            <h1>Sign Up</h1>
            <Form
              className="signup-form"
              encType="multipart/form-data"
              onSubmit={onFormSubmit}
            >
              <div className="form-content">
                <label htmlFor="user_name">Username</label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={user_name}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  value={password_confirmation}
                  onChange={handleChange}
                />
                <label htmlFor="company_name">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  value={company_name}
                  onChange={handleChange}
                />
                <label htmlFor="logo">Logo</label>
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFile}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  value="submit"
                  id="submit"
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  id="submit"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </Button>
              </div>
            </Form>
          </div>
        </Grid>
      </FormContainer>
    </div>
  );
}
export default NewUser;

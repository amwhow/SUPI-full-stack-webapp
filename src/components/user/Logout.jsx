import React from 'react' 
import { Route, useHistory } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


export default function Logout() {
  const history = useHistory();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login")
  }

  return (
    <>
      
    </>
  )
}

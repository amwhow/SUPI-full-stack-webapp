import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Login from './user/Login'
import LoggedOutNav from './user/LoggedOutNav'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Home = ({ history }) => {
  const classes = useStyles();
  const loggedInStatus = localStorage.getItem("token");
  if (loggedInStatus) {
    history.push('/dashboard')
  }

  return (
    <>
      <div className="login-container">
        <LoggedOutNav/>
        <div className={classes.root}>
          <Grid container spacing={3}  alignItems="center" justifyContent="space-between" style={{ minHeight: '80vh' }}>
            <Grid item xs={12} sm={7} align="center">
              <h1>Welcome to SUPI</h1>
              <p style={{width:"85%"}}>Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum Lorim ipsum</p>
            </Grid>
            <Login history={history}/>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Home
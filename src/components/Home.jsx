import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Login from './user/Login'
import LoggedOutNav from './user/LoggedOutNav'
import Grid from '@material-ui/core/Grid';
import Background from '../images/Home_bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "100%",
    color: 'white'
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
          <Grid container  alignItems="center" justify="space-between" style={{ minHeight: '93vh' }}>
            <Grid item xs={12} sm={7} align="center">
              <h1 style={{fontSize:"4em"}}>Welcome to SUPI</h1>
              <p style={{width:"85%", fontSize:"2em"}}>At SUPI, we know how important having good suppliers is for any business. Suppliers give you the things you need to get your business off the ground and keep it running once it is. <br/><br/>We also understand that having unreliable suppliers can make a great business not so great. This is why we created the SUPI, to help you keep track of your suppliers, maintain great relationships, and understand when it might be time to let a supplier go.</p>
            </Grid>
            <Login history={history}/>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Home
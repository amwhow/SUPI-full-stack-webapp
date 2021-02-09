import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Dashboard from "../dashboard_folder/Dashboard";
import NewUser from "./NewUser";
import Login from "./Login";
import ProtectedRoute from "../ProtectedRoute";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function LoggedOutNav() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SUPI
          </Typography>
          <Button 
            color="inherit"
          >
            <Link to="/contact">Contact</Link>
          </Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
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
          <a href="/contact" style={{ textDecoration: "none", color: "white", paddingRight: "20px" }}>
            Contact
          </a>
          <a href="/about" style={{ textDecoration: "none", color: "white", paddingRight: "20px" }}>
            About
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}

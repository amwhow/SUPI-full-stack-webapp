import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
            <a href="/contact" style={{textDecoration: "none"}}>Contact</a>
          </Button>
          <Button color="inherit"><a href="/about" style={{textDecoration: "none"}}>About</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

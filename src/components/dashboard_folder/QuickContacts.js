import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Box from '@material-ui/core/Box';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function QuickContacts() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Quick Contacts</Title>
      {/* <Typography component="p" variant="h3">
        1
      </Typography> */}
      <Typography color="textSecondary" className={classes.depositContext}>
        <Box display="flex" justifyContent="space-between">
            Contact Name 
            <button>Email</button>
        </Box>
        <hr/>
        <Box display="flex" justifyContent="space-between">
            Contact Name 
            <button>Email</button>
        </Box>
        <hr/>
        <Box display="flex" justifyContent="space-between">
            Contact Name 
            <button>Email</button>
        </Box>
        <hr/>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            Add new contact
          </Link>
      </div>
      </Typography>
    </React.Fragment>
  );
}

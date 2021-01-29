import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  calendarContext: {
    flex: 1,
  },
});

export default function Calendar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Calendar here</Title>
      {/* <Typography component="p" variant="h4">
        $308.00
      </Typography> */}
      <Typography color="textSecondary" className={classes.calendarContext}>
        1 Feb, 2021
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function POApprovals() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>PO Approvals</Title>
      <Typography component="p" variant="h3">
        1
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            Supplier Name - Date
          </Link>
        </div>
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          All Purchase Orders
        </Link>
      </div>
    </React.Fragment>
  );
}

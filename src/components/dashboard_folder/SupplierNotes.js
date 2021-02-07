import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  POApprovalContext: {
    flex: 1,
  },
});

export default function SupplierNotes() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Supplier Notes</Title>
      <Typography color="textSecondary" className={classes.POApprovalContext}>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            Note 1 - date
          </Link>
        </div>
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Add new note
        </Link>
      </div>
    </React.Fragment>
  );
}

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useHistory } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  POApprovalContext: {
    flex: 1,
  },
});

export default function SupplierNotes({supplier}) {
  const history = useHistory()
  const classes = useStyles();
  console.log(supplier.id)
  const id = supplier.id
  return (
    <React.Fragment>
      <Title>Supplier Notes</Title>
      <Typography color="textSecondary" className={classes.POApprovalContext}>
        <div>
          <p>
            Note: {supplier.note}
          </p>
        </div>
      </Typography>
      <div>
        <Link color="primary" href={`/suppliers/edit/${id}`} >
          Edit Note
        </Link>
      </div>
    </React.Fragment>
  );
}

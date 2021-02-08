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

export default function InvoicesDue({invoiceData}) {
  const classes = useStyles();
  if (invoiceData) {
    let counter = 0
    return (
      <React.Fragment>
        <Title>Invoices Due</Title>
        <Typography component="p" variant="h3">
          {invoiceData.length}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {invoiceData.reverse().map((invoice) => {
            if (invoice.paid === false && counter <= 3) {
              counter += 1
                return (
                <div>
                  <Link color="primary" href={invoice.invoice_document} onClick={preventDefault}>
                    ${invoice.totalPrice} - Due on: {invoice.dueDate}
                  </Link>
                </div>
                )
              }
            }
          )}
        </Typography>
        {/* <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            All invoices
          </Link>
        </div> */}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Title>Invoices Due</Title>
        <Typography component="p" variant="h3">
          0
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          
        </Typography>
        {/* <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            All invoices
          </Link>
        </div> */}
      </React.Fragment>
    );
  }
}

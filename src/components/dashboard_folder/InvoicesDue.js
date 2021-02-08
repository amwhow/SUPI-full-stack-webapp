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
  console.log(invoiceData)
  // [#<Invoice id: 1, receivedDate: "2021-01-28", dueDate: "2021-02-28", totalPrice: 0.2e3, paid: false, created_at: "2021-02-07 12:33:24.193584000 +0000", updated_at: "2021-02-07 12:33:24.274551000 +0000", purchase_order_id: 1, user_id: 5>]>
  return (
    <React.Fragment>
      <Title>Invoices Due</Title>
      <Typography component="p" variant="h3">
        {invoiceData.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {invoiceData.reverse().map((invoice) => {
          console.log("invoice_document: " + invoice.invoice_document)
          if (invoice.paid === false) {
            return (
            <div>
              <Link color="primary" href={invoice.invoice_document} onClick={preventDefault}>
                Amount: ${invoice.totalPrice} - Due on: {invoice.dueDate}
              </Link>
            </div>
            )
          }
        })}
      
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          All invoices
        </Link>
      </div>
    </React.Fragment>
  );
}

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function InvoicesDue({ invoiceData }) {
  const classes = useStyles();
  if (invoiceData) {
    let counter = 0;
    // filter not paid invoices
    const dueInvoiceData = invoiceData.filter(
      (invoice) => invoice.paid === false
    );
    return (
      <React.Fragment>
        <Title>Invoices Due</Title>
        <Typography component="p" variant="h3">
          {dueInvoiceData.length}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {dueInvoiceData.reverse().each((invoice) => {
            if (
              invoice.paid === false &&
              counter <= 5 &&
              invoice.invoice_document
            ) {
              counter += 1;
              return (
                <div>
                  <Link
                    color="primary"
                    href={invoice.invoice_document.url}
                    target="_blank"
                  >
                    ${invoice.totalPrice} - Due on: {invoice.dueDate}
                  </Link>
                </div>
              );
            } else if (invoice.paid === false && counter <= 5) {
              counter += 1;
              return (
                <div>
                  <p>
                    ${invoice.totalPrice} - Due on: {invoice.dueDate}
                  </p>
                </div>
              );
            }
          })}
        </Typography>
      </React.Fragment>
    );
  }
  // if there's no invoice data, invoices due is 0
  else {
    return (
      <React.Fragment>
        <Title>Invoices Due</Title>
        <Typography component="p" variant="h3">
          0
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.depositContext}
        ></Typography>
      </React.Fragment>
    );
  }
}

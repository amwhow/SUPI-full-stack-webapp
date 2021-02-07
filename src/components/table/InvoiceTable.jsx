import React, { useState, useEffect } from "react"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function InvoiceTable() {
  const classes = useStyles();

  const [invoices, setInvoices] = useState([]);

  function fetchInvoices() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setInvoices(body))
  }

  useEffect(() => {
    fetchInvoices();
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Number</StyledTableCell>
            <StyledTableCell align="right">Received On</StyledTableCell>
            <StyledTableCell align="right">Due Date</StyledTableCell>
            <StyledTableCell align="right">Total Price</StyledTableCell>
            <StyledTableCell align="right">Payment Status</StyledTableCell>
            <StyledTableCell align="right">PO Number</StyledTableCell>
            <StyledTableCell align="right">Invoice Document</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <StyledTableRow key={invoice.id}>
              <StyledTableCell component="th" scope="row">
                # {invoice.id}
              </StyledTableCell>
              <StyledTableCell align="right">{invoice.receivedDate}</StyledTableCell>
              <StyledTableCell align="right">{invoice.dueDate}</StyledTableCell>
              <StyledTableCell align="right">${invoice.totalPrice}</StyledTableCell>
              <StyledTableCell align="right">{invoice.paid ? "Payment made" : "Awaiting payment"}</StyledTableCell>
              <StyledTableCell align="right">#{invoice.purchase_order_id}</StyledTableCell>
              <StyledTableCell align="right">Waiting for file</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
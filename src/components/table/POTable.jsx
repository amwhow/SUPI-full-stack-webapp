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

export default function POTable({poData}) {
  const classes = useStyles();

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  function fetchPurchaseOrders() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setPurchaseOrders(body))
  }

  useEffect(() => {
    fetchPurchaseOrders();
  },[])

  console.log(purchaseOrders)

  const invoiceLinks = purchaseOrders.map((PO, index) => {
    return `/dashboard/purchase_orders/${PO.id}/invoices/new`
  })

  const reviewLinks = purchaseOrders.map((PO, index) => {
    return `/dashboard/purchase_orders/${PO.id}/reviews/new`
  })

  return (
    <div>
      <h1 className="table-heading">Purchase Orders</h1>
      <div className="table-button">
        <button>
          <a href="/dashboard/purchase_orders/new">+ New PO</a>
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Purchase Order #</StyledTableCell>
              <StyledTableCell align="right">Order Date</StyledTableCell>
              <StyledTableCell align="right">Approval Status</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">Delivery Status</StyledTableCell>
              <StyledTableCell align="right">PO Document</StyledTableCell>
              <StyledTableCell align="right">Invoice</StyledTableCell>
              <StyledTableCell align="right">Review</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.map((PO, index) => (
              <StyledTableRow key={PO.id}>
                <StyledTableCell component="th" scope="row">
                  # {PO.id}
                </StyledTableCell>
                <StyledTableCell align="right">{PO.orderDate}</StyledTableCell>
                <StyledTableCell align="right">{PO.approvalStatus ? "Approved" : "Awaiting approval"}</StyledTableCell>
                <StyledTableCell align="right">${PO.totalPrice}</StyledTableCell>
                <StyledTableCell align="right">{PO.deliveryStatus ? "Delivered" : "Awaiting delivery"}</StyledTableCell>
                <StyledTableCell align="right">
                  <a href={PO.po_document.url}>PO Document file</a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={invoiceLinks[index]}>Add invoice</a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={reviewLinks[index]}>Add review</a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

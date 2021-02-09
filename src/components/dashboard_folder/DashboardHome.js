import clsx from "clsx";
import React, {useState, useEffect} from 'react';
import Chart from './Chart';
import Calendar from './Calendar';
import InvoicesDue from './InvoicesDue';
import POApprovals from './POApprovals';
import QuickContacts from './QuickContacts';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DashboardStyles from './DashboardStyles';

const useStyles = DashboardStyles;

const DashboardHome = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceWithFile, setInvoiceWithFile] = useState([]);
  const [poDataWithFile, setPoDataWithFile] = useState([])


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const {suppliers, contacts, purchase_orders, reviews, invoices } = response
        setSuppliers(suppliers);
        setContacts(contacts);
        setPurchaseOrders(purchase_orders);
        setReviews(reviews);
        setInvoices(invoices);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => {
        setInvoiceWithFile(body)
      })
  },[])

  useEffect(() => {
     fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setPoDataWithFile(body))
  },[])

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <Chart invoiceData={invoiceWithFile} />
        </Paper>
      </Grid>
     
      {/* Invoice due */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <InvoicesDue invoiceData={invoiceWithFile}/>
        </Paper>
      </Grid>
      {/* PO Approval */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <POApprovals poData={poDataWithFile}/>
        </Paper>
      </Grid>
      {/* Quick Contacts */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <QuickContacts contacts={contacts}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardHome

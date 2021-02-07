import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Overview from "./supplier_info/Overview";
import Evaluation from "./supplier_info/Evaluation";
import PurchaseOrders from "./supplier_info/PurchaseOrders";
import Calendar from "./Calendar";
import InvoicesDue from "./InvoicesDue";
import POApprovals from "./POApprovals";
import SupplierNotes from "./SupplierNotes";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 40,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    "&$selected": {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: theme.palette.primary.main,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DashboardTabs({ supplier, fixedHeightPaper }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [poData, setPoData] = useState([])
  const [reviewData, setReviewData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const id = supplier.id;

  // get all PO data and their reviews for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/purchase_orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((response) => {
        const { pos, reviews, invoices } = response;
        setPoData(pos);
        setReviewData(reviews)
        setInvoiceData(invoices)
        // handleReview("costRating")
      });
  }, [id]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <AntTab label="Overview" {...a11yProps(0)} />
          <AntTab label="Evaluation" {...a11yProps(1)} />
          <AntTab label="Purchase Orders" {...a11yProps(2)} />
          <AntTab label="Invoices" {...a11yProps(3)} />
          <AntTab label="Documents" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      {/* Overview Tab */}
      <TabPanel value={value} index={0}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={8}>
            <Overview supplier={supplier} />
          </Grid>
          {/* Calendar */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="notFixedHeight" elevation={0}>
              <Calendar />
            </Paper>
          </Grid>
          {/* Invoice due */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper} variant="outlined">
              <InvoicesDue invoiceData={invoiceData}/>
            </Paper>
          </Grid>
          {/* PO Approval */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper} variant="outlined">
              <POApprovals poData={poData} />
            </Paper>
          </Grid>
          {/* Supplier Notes */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper} variant="outlined">
              <SupplierNotes />
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      {/* Evaluation Tab */}
      <TabPanel value={value} index={1}>
        <Grid container spacing={1}>
          <Evaluation supplier={supplier} reviewData={reviewData}/>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PurchaseOrders />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Invoices
      </TabPanel>
      <TabPanel value={value} index={4}>
        Documents
      </TabPanel>
    </div>
  );
}

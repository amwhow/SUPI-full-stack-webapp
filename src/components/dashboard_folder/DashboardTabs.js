import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Overview from "./supplier_info/Overview";
import Evaluation from "./supplier_info/Evaluation";
import Grid from "@material-ui/core/Grid";
import POTable from "../table/POTable";
import InvoiceTable from "../table/InvoiceTable";
import DocumentTable from "../table/DocumentTable";

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

export default function DashboardTabs({
  supplier,
  poData,
  reviewData,
  invoiceData,
  fixedHeightPaper,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // calculate the rating values in the following three aspects
  let costRating = 0;
  let qualityRating = 0;
  let reliabilityRating = 0;
  //  average the total rating and then round to the closest 0.5
  if (reviewData) {
    reviewData.each((review) => {
      costRating += review.costRating;
      reliabilityRating += review.reliabilityRating;
      qualityRating += review.qualityRating;
    });
    costRating = parseFloat(
      (Math.round((costRating / reviewData.length) * 2) / 2).toFixed(1)
    );
    reliabilityRating = parseFloat(
      (Math.round((reliabilityRating / reviewData.length) * 2) / 2).toFixed(1)
    );
    qualityRating = parseFloat(
      (Math.round((qualityRating / reviewData.length) * 2) / 2).toFixed(1)
    );
  }

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
          <Grid item xs={12} md={12} lg={12}>
            <Overview
              supplier={supplier}
              fixedHeightPaper={fixedHeightPaper}
              poData={poData}
              invoiceData={invoiceData}
              costRating={costRating}
              qualityRating={qualityRating}
              reliabilityRating={reliabilityRating}
            />
          </Grid>
        </Grid>
      </TabPanel>
      {/* Evaluation Tab */}
      <TabPanel value={value} index={1}>
        <Grid container spacing={1}>
          <Evaluation
            supplier={supplier}
            reviewData={reviewData}
            costRating={costRating}
            qualityRating={qualityRating}
            reliabilityRating={reliabilityRating}
          />
        </Grid>
      </TabPanel>
      {/* Purchase Order Tab */}
      <TabPanel value={value} index={2}>
        <POTable poData={poData} />
      </TabPanel>
      {/* Invoices Tab */}
      <TabPanel value={value} index={3}>
        <InvoiceTable invoiceData={invoiceData} />
      </TabPanel>
      {/* Documents Tab */}
      <TabPanel value={value} index={4}>
        <DocumentTable poData={poData} />
      </TabPanel>
    </div>
  );
}

import clsx from "clsx";
import React from 'react';
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
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={7} lg={8}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <Chart />
        </Paper>
      </Grid>
      {/* Calendar */}
      <Grid item xs={12} md={5} lg={4}>
        <Paper className={fixedHeightPaper}>
          <Calendar />
        </Paper>
      </Grid>
      {/* Invoice due */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          {/* pass in current_user.pos.invoices data */}
          {/* <InvoicesDue /> */}
        </Paper>
      </Grid>
      {/* PO Approval */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          {/* <POApprovals /> */}
        </Paper>
      </Grid>
      {/* Quick Contacts */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <QuickContacts />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardHome

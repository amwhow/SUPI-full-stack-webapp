import clsx from "clsx";
import React from 'react';
import Calendar from './Calendar';
import InvoicesDue from './InvoicesDue';
import POApprovals from './POApprovals';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DashboardStyles from './DashboardStyles';

const useStyles = DashboardStyles;

const DashboardSupplier = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Info section */}
      <Grid item xs={12} md={7} lg={8}>
        <Paper className={fixedHeightPaper}>
          <h1>Meggies's Farm</h1>
          <button>Manage Supplier</button>
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
        <Paper className={fixedHeightPaper}>
          <InvoicesDue />
        </Paper>
      </Grid>
      {/* PO Approval */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper}>
          <POApprovals />
        </Paper>
      </Grid>
      {/* Supplier Notes */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper}>
          <p>Supplier Notes</p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardSupplier

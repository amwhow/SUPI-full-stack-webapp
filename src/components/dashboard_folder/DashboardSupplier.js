import clsx from "clsx";
import React, {useState, useEffect} from "react";
import Calendar from "./Calendar";
import InvoicesDue from "./InvoicesDue";
import POApprovals from "./POApprovals";
import SupplierNotes from "./SupplierNotes";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DashboardStyles from "./DashboardStyles";
import Button from "@material-ui/core/Button";
import DashboardTabs from "./DashboardTabs";
import Overview from "./supplier_info/Overview"
import { useParams, useHistory } from "react-router-dom";

const useStyles = DashboardStyles;

const DashboardSupplier = (props) => {
  // const history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [supplier, setSupplier] = useState("failed supplier")
  
  useEffect(()=> {
    setSupplier(props.location.state.supplier)
  }, [props.location])
  
  return (
    <Grid container spacing={3}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={6} md={6} lg={6}>
          <h1>{supplier.name}</h1>
        </Grid>
        <Grid item >
          <Button
            variant="contained"
            value="Edit Supplier"
            id="submit"
            color="primary"
            onClick={() => props.history.push(`/suppliers/edit/${supplier.id}`)}
          >
            Edit Supplier
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <Paper className="notFixedHeight" variant="outlined">
          <DashboardTabs supplier={supplier} />
        </Paper>
      </Grid>
      {/* Calendar */}
      <Grid item xs={12} md={5} lg={4}>
        <Paper className="notFixedHeight" elevation={0}>
          <Calendar />
        </Paper>
      </Grid>
      {/* Invoice due */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <InvoicesDue />
        </Paper>
      </Grid>
      {/* PO Approval */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <POApprovals />
        </Paper>
      </Grid>
      {/* Supplier Notes */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <SupplierNotes />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardSupplier;

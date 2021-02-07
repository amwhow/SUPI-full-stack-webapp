import clsx from "clsx";
import React, {useState, useEffect} from "react";
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
  const fixedHeightChartPaper = clsx(classes.paper);
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
        <Grid item xs={6} md={6} lg={6} align="end">
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

      <Grid item xs={12} md={12} lg={12}>
        <DashboardTabs supplier={supplier} fixedHeightPaper={fixedHeightPaper}/>
      </Grid>
    </Grid>
  );
};

export default DashboardSupplier;

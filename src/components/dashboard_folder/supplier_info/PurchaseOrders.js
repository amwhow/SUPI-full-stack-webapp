import React from "react";
import Grid from "@material-ui/core/Grid";
import POTable from "../../table/POTable"

export default function PurchaseOrders() {
  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={6} lg={6}>
        <POTable />
      </Grid>

    </Grid>
  );
}

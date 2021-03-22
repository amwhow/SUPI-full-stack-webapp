import React from "react";
import Grid from "@material-ui/core/Grid";
import POTable from "../../table/POTable";
import { useParams } from "react-router-dom";

export default function PurchaseOrders() {
  const { id } = useParams();
  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={6} lg={6}>
        <POTable supplierId={id}/>
      </Grid>
    </Grid>
  );
}

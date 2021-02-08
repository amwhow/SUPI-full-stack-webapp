import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InvoicesDue from "../InvoicesDue";
import POApprovals from "../POApprovals";
import SupplierNotes from "../SupplierNotes";
import Rating from "./Rating"

export default function Overview({ supplier, fixedHeightPaper, poData, invoiceData, reviewData}) {

  let costRating = 0
  let qualityRating = 0
  let reliabilityRating = 0
  reviewData.map((review) => {
    costRating += review.costRating
    reliabilityRating += review.reliabilityRating
    qualityRating += review.qualityRating
  })
  costRating =  parseFloat((Math.round(costRating/(reviewData.length) * 2) / 2))
  reliabilityRating =  parseFloat((Math.round(reliabilityRating/(reviewData.length) * 2) / 2))
  qualityRating =  parseFloat((Math.round(qualityRating/(reviewData.length) * 2) / 2).toFixed(1))
  console.log("reliabilityRating: "+ reliabilityRating)
  console.log("qualityRating: "+ qualityRating)
  console.log("qualityRating type: "+ typeof(qualityRating))

  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={6} lg={6}>
        <h1>{supplier.name}</h1>
        <p>Supplier Description: {supplier.note}</p>
        <p>Contact Person: {supplier.contact_name}</p>
        <p>Email: {supplier.contact_email}</p>
        <p>Phone: {supplier.contact_number}</p>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <h4>Cost Rating</h4>
          <Rating rating={costRating} />
        <h4>Quality Rating</h4>
         <Rating rating={qualityRating} />
        <h4>Reliability Rating</h4>
          <Rating rating={reliabilityRating} />
      </Grid>

      {/* calendar */}
      {/* <Grid item xs={12} md={4} lg={4}>
        <Paper className="notFixedHeight" elevation={0}>
          <Calendar />
        </Paper>
      </Grid> */}
      
      {/* Invoice due */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper} variant="outlined">
          <InvoicesDue invoiceData={invoiceData} />
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
          <SupplierNotes supplier={supplier} />
        </Paper>
      </Grid>
    </Grid>
  );
}

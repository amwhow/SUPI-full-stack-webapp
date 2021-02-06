import React from "react";
import Grid from "@material-ui/core/Grid";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export default function Overview({supplier}) {
  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={6} lg={6}>
        <h1>{supplier.name}</h1>
        <p>
          Supplier Description: {supplier.note}
        </p>
        <p>Contact Person: {supplier.contact_name}</p>
        <p>Email: {supplier.contact_email}</p>
        <p>Phone: {supplier.contact_number}</p>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <h4>Cost Rating</h4><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon/>
        <h4>Quality Rating</h4><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon/><StarBorderIcon/>
        <h4>Reliability Rating</h4><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarHalfIcon />
      </Grid>
    </Grid>
  );
}

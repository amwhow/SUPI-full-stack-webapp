import React from "react";
import Grid from "@material-ui/core/Grid";
import FormContainer from "../styles/FormContainer";

export default function About() {
  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="info-heading">SUPI - Supplier Management System</h1>
        <h2>Who we are</h2>
        <p>
          At SUPI we know how important having good suppliers is for any
          business. Suppliers give you the things you need to get your business
          off the ground and keep it running once it is. We also understand that
          having unreliable suppliers can make a great business not so great.
          This is why we created the SUPI, to help you keep track of your
          suppliers, maintain great relationships, and understand when it might
          be time to let a supplier go.
        </p>

        <h2>What we do</h2>
        <p>
          SUPI is a supplier management platform. It's designed to allow small
          to medium sized businesses to manage their suppliers by tracking
          purchase orders, invoices, supplier documents like licences, as well
          as rating their suppliers in terms of cost, quality, and reliability.
        </p>
        <p>
          Simply sign up for an account, add a new supplier to your account,
          then use the menu on the left of the page to go to that supplier's
          page where you can keep track of all things relevant to that supplier.
        </p>
      </Grid>
    </FormContainer>
  );
}

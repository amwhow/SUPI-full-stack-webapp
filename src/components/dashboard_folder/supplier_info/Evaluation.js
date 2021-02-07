import React from "react";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import Button from "@material-ui/core/Button";
import EvaluationChart from "./EvaluationChart";

export default function Overview({ supplier }) {
  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={8} lg={8}>
      <EvaluationChart />
        <p>Supplier Description: {supplier.note}</p>
        <Button
          variant="contained"
          value="Edit Supplier"
          id="submit"
          color="primary"
          onClick={() => console.log("hi")}
        >
          Cost
        </Button>
        <Button
          variant="contained"
          value="Edit Supplier"
          id="submit"
          color="primary"
          onClick={() => console.log("hi")}
        >
          Quality
        </Button>
        <Button
          variant="contained"
          value="Edit Supplier"
          id="submit"
          color="primary"
          onClick={() => console.log("hi")}
        >
          Reliability
        </Button>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <h4>Cost Rating</h4>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
        <h4>Quality Rating</h4>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <h4>Reliability Rating</h4>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarHalfIcon />
      </Grid>

      <Grid item xs={12} md={8} lg={8}>
        <h1>Job Reviews</h1>
        <h5>Date</h5>
        {/* supplier.PO.slice(-1).review? */}
        <p>lorim ipsum lorim ipsum lorim ipsum lorim ipsum lorim ipsum</p>
      </Grid>
    </Grid>
  );
}

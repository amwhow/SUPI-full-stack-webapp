import React from "react";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Paper from '@material-ui/core/Paper';
import StarHalfIcon from "@material-ui/icons/StarHalf";
import Button from "@material-ui/core/Button";
import EvaluationChart from "./EvaluationChart";
import clsx from "clsx";
import DashboardStyles from "../DashboardStyles";


export default function Evaluation({ supplier }) {
  const useStyles = DashboardStyles;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightChartPaper = clsx(classes.paper, classes.chartHeight);
  const [rating, setRating] = useState(null)

  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={10} lg={10}>
        <Paper className={fixedHeightChartPaper} variant="outlined">
          <EvaluationChart rating={rating}/>
        </Paper>
        <Button
          variant="contained"
          value="Edit Supplier"
          color="primary"
          onClick={() => setRating(cost)}
        >
          Cost
        </Button>
        <Button
          variant="contained"
          value="Edit Supplier"
          color="primary"
          onClick={() => setRating(quality)}
        >
          Quality
        </Button>
        <Button
          variant="contained"
          value="Edit Supplier"
          color="primary"
          onClick={() => setRating(reliability)}
        >
          Reliability
        </Button>
      </Grid>

      {/* <Grid item xs={12} md={2} lg={2}>
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
      </Grid> */}

      <Grid item xs={12} md={8} lg={8}>
        <h1>Job Reviews</h1>
        <h5>Date</h5>
        {/* supplier.PO.slice(-1).review? */}
        <p>lorim ipsum lorim ipsum lorim ipsum lorim ipsum lorim ipsum</p>
      </Grid>
    </Grid>
  );
}

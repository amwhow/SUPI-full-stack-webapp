import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EvaluationChart from "./EvaluationChart";
import clsx from "clsx";
import DashboardStyles from "../DashboardStyles";
import Rating from "./Rating";

export default function Evaluation({
  supplier,
  reviewData,
  costRating,
  qualityRating,
  reliabilityRating,
}) {
  const useStyles = DashboardStyles;
  const classes = useStyles();
  const fixedHeightChartPaper = clsx(classes.paper, classes.chartHeight);
  const [reviewType, setReviewType] = useState("");
  const [reviewRating, setReviewRating] = useState([]);
  const [reviewComment, setReviewComment] = useState([]);

  // get all PO data and their reviews for the selected supplier, can go to DashboardTabs
  useEffect(() => {
    setReviewType("Cost Rating");
    setReviewRating(handleReview("costRating"));
    setReviewComment(handleComment());
  }, []);

  const handleReview = (type) => {
    let reviewArray = [];
    if (reviewData) {
      reviewData.map((review) => {
        reviewArray.push({
          name: review.created_at.substring(0, 10),
          rating: review[type],
        });
      });
    }
    return reviewArray;
  };
  const handleComment = () => {
    let commentArray = [];
    if (reviewData) {
      reviewData.map((review) => {
        commentArray.push({
          date: review.created_at.substring(0, 10),
          comment: review["comment"],
        });
      });
      return commentArray;
    }
  };

  return (
    <Grid container spacing={3} direction="row" justify="flex-start">
      <Grid item xs={12} md={9} lg={9}>
        <Paper className={fixedHeightChartPaper} variant="outlined">
          <EvaluationChart
            reviewType={reviewType}
            reviewRating={reviewRating}
          />
        </Paper>
        <Button
          variant="contained"
          value="costRating"
          color="primary"
          onClick={() => {
            setReviewType("Cost Rating");
            setReviewRating(handleReview("costRating"));
          }}
        >
          Cost
        </Button>
        <Button
          variant="contained"
          value="qualityRating"
          color="primary"
          onClick={() => {
            setReviewType("Quality Rating");
            setReviewRating(handleReview("qualityRating"));
          }}
        >
          Quality
        </Button>
        <Button
          variant="contained"
          value="reliabilityRating"
          color="primary"
          onClick={() => {
            setReviewType("Reliability Rating");
            setReviewRating(handleReview("reliabilityRating"));
          }}
        >
          Reliability
        </Button>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <h4>Cost Rating</h4>
        <Rating rating={costRating} />
        <h4>Quality Rating</h4>
        <Rating rating={qualityRating} />
        <h4>Reliability Rating</h4>
        <Rating rating={reliabilityRating} />
      </Grid>
    </Grid>
  );
}

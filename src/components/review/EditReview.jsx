import React, { useReducer, useEffect } from "react";
import reducer from "../../utils/reducer";
import { Form } from "../styles/Form";
import Grid from "@material-ui/core/Grid";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

function EditReview(props) {
  const initialReviewState = {
    qualityRating: "",
    reliabilityRating: "",
    costRating: "",
    comment: "",
  };

  const { id } = useParams();
  const [store, dispatch] = useReducer(reducer, initialReviewState);
  const { qualityRating, reliabilityRating, costRating, comment } = store;

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value,
    });
  };

  const reviewKeys = [
    "qualityRating",
    "reliabilityRating",
    "costRating",
    "comment",
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((review) => {
        reviewKeys.each((element) => {
          dispatch({
            type: `set${element}`,
            data: review[element],
          });
        });
      });
  }, []);

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      review: {
        qualityRating: qualityRating,
        reliabilityRating: reliabilityRating,
        costRating: costRating,
        comment: comment,
      },
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      alert("Review updated");
      props.history.push("/dashboard/purchase_orders");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">Edit Review</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="qualityRating">Quality rating</label>
            <select
              name="qualityRating"
              id="qualityRating"
              value={qualityRating}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value={0}>0 Stars</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="reliabilityRating">Reliability rating</label>
            <select
              name="reliabilityRating"
              id="reliabilityRating"
              value={reliabilityRating}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value={0}>0 Stars</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="costRating">Cost rating</label>
            <select
              name="costRating"
              id="costRating"
              value={costRating}
              onChange={handleChange}
            >
              <option value="">Select rating</option>
              <option value={0}>0 Stars</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              name="comment"
              id="comment"
              value={comment}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Edit Review"
              id="submit"
              color="primary"
            >
              Save
            </Button>
            <div className="form-content">
              <Button
                variant="contained"
                id="submit"
                onClick={() => {
                  props.history.goBack();
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  );
}

export default EditReview;

import React, { useReducer } from "react";
import reducer from "../../utils/reducer";
import { Form } from "../styles/Form";
import Grid from "@material-ui/core/Grid";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewReview({ history }) {
  const initialReviewState = {
    qualityRating: "",
    reliabilityRating: "",
    costRating: "",
    comment: "",
    purchaseOrderId: "",
  };

  // need to fetch purchase orders so they can be used as dropdown menu options in form.
  // below is just and example of how we can structure the data after fetching
  // const purchaseOrderOptions = [
  //   {
  //     label: `PO: #${purchase_order_id}`,
  //     value: `${purchase_order_id}`,
  //   },
  //   {
  //     label: `PO: #${purchase_order_id}`,
  //     value: `${purchase_order_id}`,
  //   },
  //   {
  //     label: `PO: #${purchase_order_id}`,
  //     value: `${purchase_order_id}`,
  //   },
  // ];

  const [store, dispatch] = useReducer(reducer, initialReviewState);
  const {
    qualityRating,
    reliabilityRating,
    costRating,
    comment,
    purchaseOrderId,
  } = store;

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value,
    });
  };

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      review: {
        qualityRating,
        reliabilityRating,
        costRating,
        comment,
        purchase_order_id,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      history.push("/reviews");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">New Review</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="purchaseOrderId">Purchase Order</label>
            <select
              name="purchaseOrderId"
              id="purchaseOrderId"
              value={purchaseOrderId}
              onChange={handleChange}
            >
              {purchaseOrderOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="qualityRating">Quality rating</label>
            <select
              name="qualityRating"
              id="qualityRating"
              value={qualityRating}
              onChange={handleChange}
            >
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
              value="Submit Review"
              id="submit"
              color="primary"
            >
              Create
            </Button>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  );
}

export default NewReview;

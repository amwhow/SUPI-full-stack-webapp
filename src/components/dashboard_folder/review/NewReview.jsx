import React, {useReducer} from "react"

function NewReview({ history }) {
  const initialReviewState = {
    qualityRating: "",
    reliabilityRating: "",
    costRating: "",
    comment: "",
    purchase_order_id: ""
  }



  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Review</h1>
      <form className="new-invoice-form">
        <div className="form-group">
          <label htmlFor="qualityRating">Quality rating</label>
          <select name="qualityRating" id="qualityRating">
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reliabilityRating">Reliability rating</label>
          <select name="reliabilityRating" id="reliabilityRating">
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="costRating">Cost rating</label>
          <select name="costRating" id="costRating">
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            id="comment" 
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Review"
            id="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default NewPO
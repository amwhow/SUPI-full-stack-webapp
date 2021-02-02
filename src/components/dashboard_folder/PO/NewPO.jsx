import React, {useReducer} from "react"

function NewPO({ history }) {
  const initialPOState = {
    orderDate: "",
    approvalStatus: "",
    totalPrice: "",
    delivered: "",
    supplier_id: "",
    user_id: "",
    PO_document: ""
  }

  // need to fetch supplier so they can be used as dropdown menu options in form. 
  // below is just and example of how we can structure the data after fetching
  const supplierOptions = [
    {
      label: `Supplier: #${supplier_id}`,
      value: `${supplier_id}`,
    },
    {
      label: `Supplier: #${supplier_id}`,
      value: `${supplier_id}`,
    },
    {
      label: `Supplier: #${supplier_id}`,
      value: `${supplier_id}`,
    },
  ];

  // recommend we add a function to set today's date as the min value for date inputs

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Invoice</h1>
      <form className="new-invoice-form">
        <div className="form-group">
          <label htmlFor="orderDate">Order date</label>
          <input
            type="date"
            name="orderDate"
            id="orderDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="approvalStatus">Approval</label>
          <select name="approvalStatus" id="approvalStatus">
            <option value={false}>Awaiting approval</option>
            <option value={true}>Approved</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total price</label>
          <input
            type="number"
            name="totalPrice"
            id="totalPrice"
            step=".01"
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="delivered">Delivery</label>
          <select name="delivered" id="delivered">
            <option value={false}>Awaiting delivery</option>
            <option value={true}>Delivered</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="supplier_id">Supplier</label>
          <select
            name="supplier_id"
            id="supplier_id">
              {supplierOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="PO_document">File</label>
          <input
            type="file"
            name="PO_document"
            id="PO_document"
            accept=".pdf,.doc,.md" 
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create PO"
            id="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default NewPO
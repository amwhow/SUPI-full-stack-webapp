import React, {useReducer} from "react"

function NewInvoice({ history }) {
  const initialInvoiceState = {
    receivedDate: "",
    dueDate: "",
    totalPrice: "",
    paid: "",
    purchase_order_id: "",
    user_id: "",
    invoice_document: ""
  }

  // need to fetch purchase orders so they can be used as dropdown menu options in form. 
  // below is just and example of how we can structure the data after fetching
  const purchaseOrderOptions = [
    {
      label: `PO: #${purchase_order_id}`,
      value: `${purchase_order_id}`,
    },
    {
      label: `PO: #${purchase_order_id}`,
      value: `${purchase_order_id}`,
    },
    {
      label: `PO: #${purchase_order_id}`,
      value: `${purchase_order_id}`,
    },
  ];

  // recommend we add a function to set today's date as the min value for date inputs

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Invoice</h1>
      <form className="new-invoice-form">
        <div className="form-group">
          <label htmlFor="receivedDate">Date received</label>
          <input
            type="date"
            name="receivedDate"
            id="receivedDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Date due</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
          />
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
          <label htmlFor="paid">Payment made</label>
          <select name="paid" id="paid">
            <option value={false}>Awaiting payment</option>
            <option value={true}>Payment made</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="purchase_order_id">Purchase Order</label>
          <select
            name="purchase_order_id"
            id="purchase_order_id">
              {purchaseOrderOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="invoice_document">File</label>
          <input
            type="file"
            name="invoice_document"
            id="invoice_document"
            accept=".pdf,.doc,.md" 
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Invoice"
            id="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default NewInvoice
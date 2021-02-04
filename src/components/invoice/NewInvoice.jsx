import React, {useReducer} from "react"
import reducer from '../../utils/reducer'

function NewInvoice({ history, match }) {
  const initialInvoiceState = {
    receivedDate: "",
    dueDate: "",
    totalPrice: "",
    paid: "",
    purchaseOrderId: match.params.id,
    invoiceDocument: ""
  }

  // recommend we add a function to set today's date as the min value for date inputs

  const [store, dispatch] = useReducer(reducer, initialInvoiceState)
  const {receivedDate, dueDate, totalPrice, paid, invoiceDocument} = store

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value
    })
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { invoice: {receivedDate: receivedDate, dueDate: dueDate, totalPrice: totalPrice, paid: paid, purchase_order_id: match.params.id} }
    // , invoice_document
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
      });
      history.push("/invoices")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Invoice</h1>
      <form className="new-invoice-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="receivedDate">Date received</label>
          <input
            type="date"
            name="receivedDate"
            id="receivedDate"
            value={receivedDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Date due</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={handleChange}
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
            value={totalPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="paid">Payment made</label>
          <select 
            name="paid" 
            id="paid"
            value={paid}
            onChange={handleChange}>
              <option value=''>Select payment status</option>
              <option value={false}>Awaiting payment</option>
              <option value={true}>Payment made</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label htmlFor="purchaseOrderId">Purchase Order</label>
          <select
            name="purchaseOrderId"
            id="purchaseOrderId"
            value={purchaseOrderId}
            onChange={handleChange}>
              {purchaseOrderOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
          </select>
        </div> */}
        <div className="form-group">
          <label htmlFor="invoiceDocument">File</label>
          <input
            type="file"
            name="invoiceDocument"
            id="invoiceDocument"
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
import React, {useReducer, useState, useEffect} from "react"
import reducer from '../../utils/reducer'

function NewPO({ history }) {
  const initialPOState = {
    orderDate: "",
    approvalStatus: "",
    totalPrice: "",
    delivered: "",
    PODocument: ""
  }
  
  const [supplierId, setSupplierId] = useState({
    data: [],
    selected: ''
  });
  
  function fetchSuppliers() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setSupplierId({
        data: body,
        selected: ''
      }))
  }

  useEffect(() => {
    fetchSuppliers();
  },[])

  // recommend we add a function to set today's date as the min value for date inputs

  const [store, dispatch] = useReducer(reducer, initialPOState)
  const {orderDate, approvalStatus, totalPrice, delivered, PODocument} = store

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value
    })
  }

  const handleSelect = (e) => {
    setSupplierId({
      data: supplierId.data,
      selected: e.target.value
    })
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { purchase_order: {orderDate: orderDate, approvalStatus: approvalStatus, totalPrice: totalPrice, delivered: delivered, supplier_id: supplierId.selected} }
    // , PO_document
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
      });
      history.push("/purchase_orders")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New PO</h1>
      <form className="new-invoice-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="orderDate">Order date</label>
          <input
            type="date"
            name="orderDate"
            id="orderDate"
            value={orderDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="approvalStatus">Approval</label>
          <select
            name="approvalStatus"
            id="approvalStatus"
            value={approvalStatus}
            onChange={handleChange}>
              <option value=''>Select approval status</option>
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
            value={totalPrice}
            step=".01"
            min="1"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="delivered">Delivery</label>
          <select
            name="delivered"
            id="delivered"
            value={delivered}
            onChange={handleChange}>
              <option value=''>Select delivery status</option>
              <option value={false}>Awaiting delivery</option>
              <option value={true}>Delivered</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="supplierId">Supplier</label>
          <select
            name="supplierId"
            id="supplierId"
            value={supplierId}
            onChange={handleSelect}>
              <option key={0} value={''}>
                  Select supplier
                </option>
              {supplierId.data.map((option) => {
                return( <option key={option.id} value={option.id}>
                  {option.name}
                </option> )
              })}
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
import React, { useReducer, useEffect } from "react";
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

function EditInvoice(props) {
  const initialInvoiceState = {
    receivedDate: "",
    dueDate: "",
    totalPrice: "",
    paid: "",
    invoiceDocument: ""
  }

  const { id } = useParams();
  const [store, dispatch] = useReducer(reducer, initialInvoiceState)
  const {receivedDate, dueDate, totalPrice, paid, invoiceDocument} = store

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value,
    });
  };

  const handleFile = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.files[0]
    })
  }

  const invoiceKeys = [
    "receivedDate",
    "dueDate",
    "totalPrice",
    "paid",
    // "purchaseOrderId",
    "invoiceDocument"
  ]

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((invoice) => {
        invoiceKeys.map((element) => {
          dispatch({
            type: `set${element}`,
            data: invoice[element],
          });
        });
      });
  }, []);

  async function onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("receivedDate", receivedDate)
    formData.append("dueDate", dueDate)
    formData.append("totalPrice", totalPrice)
    formData.append("paid", paid)
    // formData.append("purchase_order_id", match.params.id)
    formData.append("invoice_document", invoiceDocument)

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });
      alert("Invoice updated")
      props.history.push("/dashboard/invoices")
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">Edit Invoice</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit} encType="multipart/form-data">
          <div className="form-content">
            <label htmlFor="receivedDate">Date received</label>
            <input
              type="date"
              name="receivedDate"
              id="receivedDate"
              value={receivedDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="dueDate">Date due</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
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
          <div className="form-content">
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
          <div className="form-content">
            <label htmlFor="invoiceDocument">File</label>
            <input
              type="file"
              name="invoiceDocument"
              id="invoiceDocument"
              accept=".pdf,.doc,.md" 
              onChange={handleFile}
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Edit Invoice"
              id="submit"
              color="primary"
            >
              Save
            </Button>
          </div>
          <div className="form-content">
            <Button
              variant="contained"
              id="submit"
              onClick={()=>{props.history.goBack()}}
            >
              Back
            </Button>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  )
}

export default EditInvoice;
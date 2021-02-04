import React, { useReducer } from "react";
import reducer from "../../utils/reducer";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewPO({ history }) {
  const initialPOState = {
    orderDate: "",
    approvalStatus: "",
    totalPrice: "",
    delivered: "",
    supplierId: "",
    PODocument: "",
  };

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

  const [store, dispatch] = useReducer(reducer, initialPOState);
  const {
    orderDate,
    approvalStatus,
    totalPrice,
    delivered,
    supplierId,
    PODocument,
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
      purchaseOrder: {
        orderDate,
        approvalStatus,
        totalPrice,
        delivered,
        supplier_id,
      },
    };
    // , PO_document
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/purchase_orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      history.push("/purchase_orders");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">New PO</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="orderDate">Order date</label>
            <input
              type="date"
              name="orderDate"
              id="orderDate"
              value={orderDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="approvalStatus">Approval</label>
            <select
              name="approvalStatus"
              id="approvalStatus"
              value={approvalStatus}
              onChange={handleChange}
            >
              <option value={false}>Awaiting approval</option>
              <option value={true}>Approved</option>
            </select>
          </div>
          <div className="form-content">
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
          <div className="form-content">
            <label htmlFor="delivered">Delivery</label>
            <select
              name="delivered"
              id="delivered"
              value={delivered}
              onChange={handleChange}
            >
              <option value={false}>Awaiting delivery</option>
              <option value={true}>Delivered</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="supplierId">Supplier</label>
            <select
              name="supplierId"
              id="supplierId"
              value={supplierId}
              onChange={handleChange}
            >
              {supplierOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="PO_document">File</label>
            <input
              type="file"
              name="PO_document"
              id="PO_document"
              accept=".pdf,.doc,.md"
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Create PO"
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

export default NewPO;

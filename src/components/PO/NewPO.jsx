import React, {useReducer, useState, useEffect} from "react"
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewPO({ history }) {
  const initialPOState = {
    orderDate: "",
    approvalStatus: "",
    totalPrice: "",
    delivered: "",
    PODocument: "",
  };

  const [supplierId, setSupplierId] = useState({
    data: [],
    selected: "",
  });

  function fetchSuppliers() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((body) =>
        setSupplierId({
          data: body,
          selected: "",
        })
      );
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // recommend we add a function to set today's date as the min value for date inputs

  const [store, dispatch] = useReducer(reducer, initialPOState);
  const {
    orderDate,
    approvalStatus,
    totalPrice,
    delivered,
    PODocument,
  } = store;

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

  const handleSelect = (e) => {
    setSupplierId({
      data: supplierId.data,
      selected: e.target.value,
    });
  };

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { purchase_order: {orderDate: orderDate, approvalStatus: approvalStatus, totalPrice: totalPrice, delivered: delivered, supplier_id: supplierId.selected, PO_document: PODocument} }
    const formData = new FormData();
    formData.append("orderDate", orderDate)
    formData.append("approvalStatus", approvalStatus)
    formData.append("totalPrice", totalPrice)
    formData.append("delivered", delivered)
    formData.append("supplier_id", supplierId.selected)
    formData.append("PO_document", PODocument)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/purchase_orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
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
        <Form className="new-invoice-form" onSubmit={onFormSubmit} encType="multipart/form-data">
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
              <option value="">Select approval status</option>
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
              <option value="">Select delivery status</option>
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
              onChange={handleSelect}
            >
              <option key={0} value={""}>
                Select supplier
              </option>
              {supplierId.data.map((option) => {
                return (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="PODocument">File</label>
            <input
              type="file"
              name="PODocument"
              id="PODocument"
              accept=".pdf,.doc,.md"
              onChange={handleFile} 
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

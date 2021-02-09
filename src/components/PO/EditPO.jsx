import React, {useReducer, useState, useEffect} from "react"
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

function EditPO(props) {
  const initialPOState = {
    orderDate: "",
    approvalStatus: "",
    totalPrice: "",
    delivered: "",
    PODocument: null
  }

  const { id } = useParams();
  console.log(id)
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
      .then((body) => {
        const {suppliers} = body
        setSupplierId({
          data: suppliers,
          selected: "",
        })
      });
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

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

  const puchaseOrderKeys = [
    "orderDate",
    "approvalStatus",
    "totalPrice",
    "delivered",
    "supplier_id",
    "po_document"
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((po) => {
        puchaseOrderKeys.map((element) => {
          dispatch({
            type: `set${element}`,
            data: po[element],
          });
        });
      });
  }, [id]);

  async function onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("orderDate", orderDate)
    formData.append("approvalStatus", approvalStatus)
    formData.append("totalPrice", totalPrice)
    formData.append("delivered", delivered)
    formData.append("supplier_id", supplierId.selected)
    formData.append("po_document", PODocument)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/purchase_orders/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      alert("Purchase order updated");
      props.history.push("/dashboard/purchase_orders");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function onDeleteLinkClick(e) {
    try {
      e.preventDefault();
      if (window.confirm("Would you like to delete?")) {
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/purchase_orders/${id}`,
          {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        alert("Purchase order deleted");
        props.history.push(`/dashboard/purchase_orders`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">Edit PO</h1>
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
              value="Edit PO"
              id="submit"
              color="primary"
            >
              Save
            </Button>
          </div>
          <div className="form-content">
            <Button
              variant="contained"
              value="go back"
              id="submit"
              onClick={() => {
                props.history.goBack();
              }}
            >
              Back
            </Button>
          </div>
          <div className="form-content">
            <Button
              variant="contained"
              value="Delete"
              id="submit"
              onClick={onDeleteLinkClick}
            >
              Delete
            </Button>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  );
}

export default EditPO;
import React, { useReducer, useEffect } from "react";
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";
import { useParams, Link } from "react-router-dom";

function EditSupplier(props) {
  const initialSupplierState = {
    name: "",
    service: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    description: "",
    note: "",
    logo: ""
  };

  const { id } = useParams();

  const [store, dispatch] = useReducer(reducer, initialSupplierState);
  const {
    name,
    service,
    website,
    contactName,
    contactEmail,
    contactNumber,
    description,
    note,
    logo
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

  const supplierKeys = [
    "name",
    "service",
    "website",
    "contact_name",
    "contact_email",
    "contact_number",
    "description",
    "note",
    "logo"
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((supplier) => {
        supplierKeys.map((element) => {
          dispatch({
            type: `set${element}`,
            data: supplier[element],
          });
        });
      });
  }, [id]);

  async function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    formData.append("service", service)
    formData.append("website", website)
    formData.append("contact_name", contactName)
    formData.append("contact_email", contactEmail)
    formData.append("contact_number", contactNumber)
    formData.append("description", description)
    formData.append("note", note)
    formData.append("logo", logo)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      alert("Supplier updated");
      props.history.push(`/dashboard/suppliers/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">Edit Supplier</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit} encType="multipart/form-data">
          <div className="form-content">
            <label htmlFor="name">Supplier name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
              id="service"
              value={service}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="website">Website url</label>
            <input
              type="text"
              name="website"
              id="website"
              value={website}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactName">Supplier contact name</label>
            <input
              type="text"
              name="contact_name"
              id="contactName"
              value={contactName}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactEmail">Supplier contact email</label>
            <input
              type="email"
              name="contact_email"
              id="contactEmail"
              value={contactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactNumber">Supplier contact number</label>
            <input
              type="text"
              name="contact_number"
              id="contactNumber"
              value={contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="note">Note</label>
            <textarea
              type="text"
              name="note"
              id="note"
              value={note}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              name="logo"
              id="logo"
              accept=".jpg,.jpeg,.png"
              onChange={handleFile} 
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Edit Supplier"
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
        </Form>
      </Grid>
    </FormContainer>
  );
}

export default EditSupplier;

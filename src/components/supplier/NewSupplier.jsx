import React, {useReducer} from "react"
import reducer from '../../utils/reducer'

function NewSupplier({ history }) {
  const initialSupplierState = {
    name: "",
    service: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    description: "",
    note: ""
  }


  // recommend we add a function to set today's date as the min value for date inputs

  const [store, dispatch] = useReducer(reducer, initialSupplierState)
  const {name, service, website, contactName, contactEmail, contactNumber, description, note} = store

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value
    })
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { supplier: {name: name, service: service, website: website, contact_name: contactName, contact_email: contactEmail, contact_number: contactNumber, description: description, note: note} }
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
      });
      history.push("/suppliers")
      alert("Supplier created")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Supplier</h1>
      <form className="new-invoice-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Supplier name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <input
            type="text"
            name="service"
            id="service"
            value={service}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website url</label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactName">Supplier contact name</label>
          <input
            type="text"
            name="contactName"
            id="contactName"
            value={contactName}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Supplier contact email</label>
          <input
            type="email"
            name="contactEmail"
            id="contactEmail"
            value={contactEmail}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Supplier contact number</label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            value={contactNumber}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <input
            type="text"
            name="note"
            id="note"
            value={note}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add Supplier"
            id="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default NewSupplier
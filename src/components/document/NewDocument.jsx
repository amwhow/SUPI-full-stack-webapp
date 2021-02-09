import React, {useReducer, useState, useEffect} from "react"
import reducer from '../../utils/reducer'
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewDocument({ history }) {
  const initialDocumentState = {
    expiryDate: "",
    documentType: "",
    supplierDocument: ""
  }

  const [store, dispatch] = useReducer(reducer, initialDocumentState)
  const {expiryDate, documentType, supplierDocument} = store

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
      .then((body) => {
        const {suppliers} = body
        setSupplierId({
          data: suppliers,
          selected: ''
      })
    })
  }

  useEffect(() => {
    fetchSuppliers();
  },[])

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

  const handleFile = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.files[0]
    })
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("expiryDate", expiryDate)
    formData.append("documentType", documentType)
    formData.append("supplier_id", supplierId.selected)
    formData.append("supplier_document", supplierDocument)

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/documents`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });
      history.push("/dashboard/documents");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">New Document</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit} encType="multipart/form-data">
          <div className="form-content">
            <label htmlFor="expiryDate">Expiry date</label>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              value={expiryDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="documentType">Document type</label>
            <select 
              name="documentType" 
              id="documentType"
              value={documentType}
              onChange={handleChange}>
                <option value="">Select document type</option>
                <option value="Licence">Licence</option>
                <option value="Contract">Contract</option>
                <option value="Risk Assessment">Risk Assessment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          <div className="form-content">
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
          <div className="form-content">
            <label htmlFor="supplierDocument">File</label>
            <input
              type="file"
              name="supplierDocument"
              id="supplierDocument"
              required
              accept=".pdf,.doc,.md"
              onChange={handleFile} 
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Create Document"
              id="submit"
              color="primary"
            >
              Create
            </Button>
          </div>
          <div className="form-content">
            <Button
              variant="contained"
              id="submit"
              onClick={()=>{history.goBack()}}
            >
              Back
            </Button>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  )
}

export default NewDocument;

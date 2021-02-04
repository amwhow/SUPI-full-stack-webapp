import React, {useReducer, useState, useEffect} from "react"
import reducer from '../../utils/reducer'


function NewDocument({ history }) {
  const initialDocumentState = {
    expiryDate: "",
    documentType: "",
    supplierDocument: ""
  }

  // recommend we add a function to set today's date as the min value for date inputs

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
      .then((body) => setSupplierId({
        data: body,
        selected: ''
      }))
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

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = { document: {expiryDate: expiryDate, documentType: documentType, supplier_id: supplierId.selected} }
    // , supplierDocument
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
      });
      history.push("/documents");
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Document</h1>
      <form className="new-invoice-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry date</label>
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            value={expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="supplier_id">Supplier</label>
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
          <label htmlFor="supplier_document">File</label>
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
            value="Create Document"
            id="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default NewDocument
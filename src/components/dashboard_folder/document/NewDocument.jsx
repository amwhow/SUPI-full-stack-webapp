import React, {useState} from "react"

function NewDocument() {
  const initialDocumentState = {
    expiryDate: "",
    documentType: "",
    supplier_id: "",
    user_id: "",
    supplier_document: ""
  }

  const [documentState, setDocumentState] = useState(initialDocumentState)

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

  return (
    <div className="new-invoice-container">
      <h1 className="new-doc-header">New Document</h1>
      <form className="new-invoice-form">
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry date</label>
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="documentType">Document type</label>
          <select name="documentType" id="documentType">
            <option value="Licence">Licence</option>
            <option value="Contract">Contract</option>
            <option value="Risk Assessment">Risk Assessment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="supplier_id">Supplier</label>
          <select
            name="supplier_id"
            id="supplier_id">
              {supplierOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
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
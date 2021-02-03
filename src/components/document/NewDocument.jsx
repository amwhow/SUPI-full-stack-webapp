import React, {useState} from "react"

function NewDocument({ history }) {
  const initialDocumentState = {
    expiryDate: "",
    documentType: "",
    supplierId: "",
    supplierDocument: ""
  }

  const [expiryDate, setExpiryDate] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierDocument, setSupplierDocument] = useState("");

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

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: {
            expiryDate: expiryDate,
            documentType: documentType,
            supplierId: supplierId,
            supplierDocument: supplierDocument
          },
        }),
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
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="documentType">Document type</label>
          <select 
            name="documentType" 
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}>
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
            id="supplier_id"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}>
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
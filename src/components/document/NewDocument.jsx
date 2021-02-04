import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewDocument({ history }) {
  const initialDocumentState = {
    expiryDate: "",
    documentType: "",
    supplierId: "",
    supplierDocument: "",
  };

  const [expiryDate, setExpiryDate] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [supplierId, setSupplierId] = useState(1);
  const [supplierDocument, setSupplierDocument] = useState("");

  // need to fetch supplier so they can be used as dropdown menu options in form.
  // below is just and example of how we can structure the data after fetching
  const supplierOptions = [
    {
      label: `Supplier: #${supplierId}`,
      value: `${supplierId}`,
    },
    {
      label: `Supplier: #${supplierId}`,
      value: `${supplierId}`,
    },
    {
      label: `Supplier: #${supplierId}`,
      value: `${supplierId}`,
    },
  ];

  // recommend we add a function to set today's date as the min value for date inputs

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            document: {
              expiryDate: expiryDate,
              documentType: documentType,
              supplierId: supplierId,
              supplierDocument: supplierDocument,
            },
          }),
        }
      );
      history.push("/documents");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">New Document</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="expiryDate">Expiry date</label>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="documentType">Document type</label>
            <select
              name="documentType"
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="Licence">Licence</option>
              <option value="Contract">Contract</option>
              <option value="Risk Assessment">Risk Assessment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="supplier_id">Supplier</label>
            <select
              name="supplier_id"
              id="supplier_id"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            >
              {supplierOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="supplier_document">File</label>
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
              value="Create Document"
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

export default NewDocument;

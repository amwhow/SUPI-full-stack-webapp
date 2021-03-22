import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardStyles from "./DashboardStyles";
import Button from "@material-ui/core/Button";
import DashboardTabs from "./DashboardTabs";
import { useParams } from "react-router-dom";

const useStyles = DashboardStyles;

const DashboardSupplier = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [supplier, setSupplier] = useState("failed supplier");
  const [poData, setPoData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((supplier) => {
        setSupplier(supplier);
      });
  }, [id]);

  // get all PO data for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/pos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setPoData(response);
      });
  }, [id]);

  // get all invoices data for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/invoices`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => setInvoiceData(response));
  }, [id]);

  // get all documents for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/documents`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => setDocumentData(response));
  }, [id]);

  // get all reviews for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => setReviewData(response));
  }, [id]);

  return (
    <Grid container spacing={3}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={6} md={6} lg={6}>
          <h1>{supplier.name}</h1>
        </Grid>
        <Grid item xs={6} md={6} lg={6} align="end">
          <Button
            variant="contained"
            value="Edit Supplier"
            id="submit"
            color="primary"
            onClick={() =>
              props.history.push(`/dashboard/suppliers/edit/${supplier.id}`)
            }
          >
            Edit Supplier
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <DashboardTabs
          supplier={supplier}
          fixedHeightPaper={fixedHeightPaper}
          poData={poData}
          reviewData={reviewData}
          documentData={documentData}
          invoiceData={invoiceData}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardSupplier;

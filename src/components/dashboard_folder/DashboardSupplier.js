import clsx from "clsx";
import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DashboardStyles from "./DashboardStyles";
import Button from "@material-ui/core/Button";
import DashboardTabs from "./DashboardTabs";
import { useParams, useHistory } from "react-router-dom";

const useStyles = DashboardStyles;

const DashboardSupplier = (props) => {
  // const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [supplier, setSupplier] = useState("failed supplier")
  const [poData, setPoData] = useState([])
  const [poDataWithFile, setPoDataWithFile] = useState([])
  const [reviewData, setReviewData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceWithFile, setInvoiceWithFile] = useState([]);
  
  useEffect(()=> {
    const data = fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.json()) 
    .then((supplier) => {setSupplier(supplier)})
  }, [id])
  
  // get all PO data and their reviews for the selected supplier
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}/purchase_orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((response) => {
        const { pos, reviews, invoices } = response;
        setPoData(pos);
        setReviewData(reviews)
        setInvoiceData(invoices)
        console.log("reviews: " + reviews)
        // handleReview("costRating")
      });
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => {
        setInvoiceWithFile(body)
      })
  },[])

  useEffect(() => {
     fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setPoDataWithFile(body))
  },[])
  
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
            onClick={() => props.history.push(`/dashboard/suppliers/edit/${supplier.id}`)}
          >
            Edit Supplier
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <DashboardTabs supplier={supplier} fixedHeightPaper={fixedHeightPaper} poData={poData} reviewData={reviewData} invoiceData={invoiceData} invoiceWithFile={invoiceWithFile} poDataWithFile={poDataWithFile}/>
      </Grid>
    </Grid>
  );
};

export default DashboardSupplier;

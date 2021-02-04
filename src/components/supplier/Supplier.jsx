import React, { useState, useEffect } from "react";
// import { CardLink } from "../styles/suppliers";

export function Supplier(props) {
  const [supplier, setSupplier] = useState(null);
  const id = props.match.params.id;

  useEffect(() => {
    // localhost:3000/suppliers/1
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((supplier) => {
        setSupplier(supplier);
      });
  }, [id]);

  return (
    supplier && (
      <>
        <div>
          <h2>Name: {supplier.name}</h2>
          <p>Price: ${supplier.price_per_month}</p>
          <p>Billing period: {supplier.billing_period}</p>
        </div>
        <CardLink to="/" onClick={props.history.goBack}>
          Back
        </CardLink>
      </>
    )
  );
}
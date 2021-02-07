import React, {useState, useEffect} from "react";

function PurchaseOrder(props) {
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const id = props.match.params.id

  useEffect(() => {
    // localhost:3000/subscriptions/10
    fetch(`${process.env.REACT_APP_BACKEND_URL}/purchase_orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((po) => {
        setPurchaseOrder(po);
      });
  }, [id]);

  console.log(purchaseOrder)

  return (
    <div>
      hello world
    </div>
  )
}

export default PurchaseOrder;
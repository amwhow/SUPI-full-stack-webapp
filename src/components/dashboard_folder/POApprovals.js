import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  POApprovalContext: {
    flex: 1,
  },
});

export default function POApprovals({poData}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>PO Approvals</Title>
      <Typography component="p" variant="h3">
        {poData.length}
      </Typography>
      <Typography color="textSecondary" className={classes.POApprovalContext}>
        {poData.map((po) => {
          console.log("po: " + po.po_document)
          if (po.approvalStatus === false) {
            return (
            <div>
              <a href={po.po_document} onClick={preventDefault}>
                Amount: ${po.totalPrice} - Ordered on: {po.orderDate}
              </a>
            </div>
            )
          }
        })}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          All Purchase Orders
        </Link>
      </div>
    </React.Fragment>
  );
}

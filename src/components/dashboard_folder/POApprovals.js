import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  POApprovalContext: {
    flex: 1,
  },
});

const POApprovals = ({ poData }) => {
  const classes = useStyles();
  if (poData) {
    let counter = 0;
    const filteredPoData = poData.filter((po) => po.approvalStatus === false);
    return (
      <React.Fragment>
        <Title>PO Approvals</Title>
        <Typography component="p" variant="h3">
          {filteredPoData.length}
        </Typography>
        <Typography color="textSecondary" className={classes.POApprovalContext}>
          {filteredPoData.reverse().map((po) => {
            // show the first five POs
            if (counter <= 5 && po.po_document) {
              counter += 1;
              return (
                <div>
                  <Link
                    color="primary"
                    href={po.po_document.url}
                    target="_blank"
                  >
                    ${po.totalPrice} - Ordered on: {po.orderDate}
                  </Link>
                </div>
              );
            } else if (counter <= 5) {
              counter += 1;
              return (
                <div>
                  <p>
                    ${po.totalPrice} - Ordered on: {po.orderDate}
                  </p>
                </div>
              );
            }
          })}
        </Typography>
      </React.Fragment>
    );
  } else {
    // show 0 PO if there is no PO data
    return (
      <React.Fragment>
        <Title>PO Approvals</Title>
        <Typography component="p" variant="h3">
          0
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.POApprovalContext}
        ></Typography>
      </React.Fragment>
    );
  }
};

export default POApprovals;

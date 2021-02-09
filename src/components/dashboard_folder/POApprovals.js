import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

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
            if (counter <= 5 && po.po_document) {
              counter += 1;
              return (
                <div>
                  <a href={po.po_document.url} target="_blank">
                    ${po.totalPrice} - Ordered on: {po.orderDate}
                  </a>
                </div>
              );
            } else if (counter <= 5) {
              {
                counter += 1;
                return (
                  <div>
                    <p>
                      ${po.totalPrice} - Ordered on: {po.orderDate}
                    </p>
                  </div>
                );
              }
            }
          })}
        </Typography>
      </React.Fragment>
    );
  } else {
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

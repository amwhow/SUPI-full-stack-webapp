import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  quickContactContext: {
    flex: 1,
  },
});

export default function QuickContacts(contacts) {
  const classes = useStyles();
  console.log(contacts.contacts);
  if (contacts.contacts.length > 0) {
    let counter = 0;
    return (
      <React.Fragment>
        <Title>Quick Contacts</Title>
        <Typography
          color="textSecondary"
          className={classes.quickContactsContext}
        >
          {contacts.contacts.reverse().map((contact) => {
            if (contact.contactName && counter < 5) {
              counter += 1;
              return (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <span>
                      {contact.supplierName}({contact.contactName}) - {contact.contactEmail}
                    </span>
                  </Box>
                  <hr/>
                </>
              );
            }
          })}
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Title>Quick Contacts</Title>
        <Typography
          color="textSecondary"
          className={classes.quickContactsContext}
        >
          <p>No Contact</p>
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            Add new contact
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

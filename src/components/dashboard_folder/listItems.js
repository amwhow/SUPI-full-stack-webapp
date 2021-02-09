import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from "@material-ui/icons/Search";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function MainListItems({history, suppliers}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [supplier, setSupplier] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={() => history.push("/dashboard")}>
          <ListItemIcon>
            {/* company logo here */}
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <hr class="MuiDivider-root" style={{ marginBottom: "10px" }} />

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="My suppliers" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* sub-menu for my suppliers here, create an iteration for user.suppliers and generate each Collapse element */}

        {suppliers && suppliers.map((element) => {
          return (
            <>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      history.push(`/dashboard/supplier/${element.id}`)
                      // getSupplierShow(history, element.id, element)
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={element.name}/>
                  </ListItem>
                </List>
              </Collapse>
            </>
          );
        })}

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => history.push("/dashboard/suppliers/new")}
            >
              <ListItemIcon>
                <AddIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="New supplier" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => history.push("/dashboard/purchase_orders")} >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Purchase Orders" />
        </ListItem>
        <ListItem button onClick={() => history.push("/dashboard/invoices")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button onClick={() => history.push("/dashboard/documents")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItem>
      </List>
    </div>
  );
}

export function SecondaryListItems({history}) {
  return (  
    <div>
      <ListSubheader inset>SUPI</ListSubheader>
      <ListItem button onClick={() => history.push("/dashboard/about")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItem>
      <ListItem button onClick={() => history.push("/dashboard/contact")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
    </div>
  )
};

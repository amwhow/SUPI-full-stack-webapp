import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import BarChartIcon from "@material-ui/icons/BarChart";
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
  
  async function getSupplierShow(history, id, supplier) {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const res = await data.json()
    setSupplier(res);
    await history.push({
      pathname: `/dashboard/supplier/${id}`,
      state: { supplier:supplier }
    })
  };

  const handleClick = () => {
    setOpen(!open);
  };
  console.log("supplier: " + supplier)
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
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Company Name" />
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
        {suppliers.map((element) => {
          return (
            <>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => 
                      getSupplierShow(history, element.id, element)
                    }
                  >
                    {/* supplier logo here */}
                    <ListItemIcon>
                      {/* should be element.logo */}
                      <PeopleIcon />
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
              onClick={() => history.push("/suppliers/new")}
            >
              <ListItemIcon>
                <AddIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="New supplier" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Find suppliers" />
        </ListItem>
      </List>
    </div>
  );
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Secondary List Items</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="TBD" />
    </ListItem>
  </div>
);

// import React from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// const AntTabs = withStyles({
//   root: {
//     borderBottom: '1px solid #e8e8e8',
//   },
//   indicator: {
//     backgroundColor: '#1890ff',
//   },
// })(Tabs);

// const AntTab = withStyles((theme) => ({
//   root: {
//     textTransform: 'none',
//     minWidth: 60,
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing(2),
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       color: '#40a9ff',
//       opacity: 1,
//     },
//     '&$selected': {
//       color: '#1890ff',
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     '&:focus': {
//       color: '#40a9ff',
//     },
//   },
//   selected: {},
// }))((props) => <Tab disableRipple {...props} />);

// export default function DashboardTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <>
//       <AntTabs
//         value={value}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//       >
//         <AntTab label="Overview" />
//         <AntTab label="Evaluation" />
//         <AntTab label="Purchase Orders" />
//         <AntTab label="Invoices" />
//         <AntTab label="Documents" />
//       </AntTabs>
//     </>
//   );
// }


import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Overview from './supplier_info/Overview'

function TabPanel(props) {
  const { children, value, index, supplier, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DashboardTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Evaluation" {...a11yProps(1)} />
          <Tab label="Purchase Orders" {...a11yProps(2)} />
          <Tab label="Invoices" {...a11yProps(3)} />
          <Tab label="Documents" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Overview supplier={supplier} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Evaluation
      </TabPanel>
      <TabPanel value={value} index={2}>
        Purchase Orders
      </TabPanel>
      <TabPanel value={value} index={3}>
        Invoices
      </TabPanel>
      <TabPanel value={value} index={4}>
        Documents
      </TabPanel>
    </div>
  );
}

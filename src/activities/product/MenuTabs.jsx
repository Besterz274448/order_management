import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={0}>
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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,

  },
}));

export default function MenuTabs(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={props.value}
          onChange={props.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="รายการสินค้าหลัก" {...a11yProps(0)} />
          <Tab label="รายการคลังสินค้า" {...a11yProps(1)} />
          <Tab label="ประวัติการแก้ไขสินค้า่" {...a11yProps(2)} />
          <Tab label="รายการสินค้าที่จำนวนใกล้หมด" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={props.value} index={0}>
          {props.MainProductTable}
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        {props.SubProductTable}
      </TabPanel>
      <TabPanel value={props.value} index={2}>
      </TabPanel>
    </div>
  );
}

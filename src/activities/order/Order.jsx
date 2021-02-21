import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import SearchIcon from "@material-ui/icons/Search";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import BreadCrumbs from "../../components/BreadCrumbs";
import OrderTable from "./OrderTable";

const classStyle = {
  textfieldColor: {
    color: "rgb(200,200,200)",
  },
  TabsBox: {
    width: "100%",
  },
  AppBar: {
    color: "rgb(0,0,0)",
    backgroundColor: "rgb(250,250,250)",
    boxShadow: "none",
  },
  TabListStyle: {
    width: "18.5%",
    border: "1px solid rgb(200,200,200)",
    boxShadow: "5px 5px 8px rgba(0,0,0,0.2)",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box marginTop="1%">
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TabContainer(props) {
  return (
    <>
      <ListItem>
        <Box maxWidth="80%">STEP {props.number}</Box>
        <Box style={{ marginLeft: "auto" }}>
          <FiberManualRecordIcon />
        </Box>
      </ListItem>
      <ListItem style={{ marginLeft: "auto", alignItems: "normal" }}>
        <Box maxWidth="80%" minHeight="50px" maxHeight="50px">
          {props.label}
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <FastForwardIcon />
        </Box>
      </ListItem>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      order: [],
    };
  }

  fetchOrder = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        this.setState({
          order: [...data],
        });
      }
    };
    xhr.open("GET", "/order.json");
    xhr.send();
  };

  componentDidMount() {
    this.fetchOrder();
    this.handleChange(null, 0);
  }

  changeTabBackground(status, no) {
    if (status) {
      document.getElementsByClassName("tabList")[no].style.backgroundColor = "rgb(100,100,255)";
      document.getElementsByClassName("tabList")[no].style.color = "white";
    } else {
      document.getElementsByClassName("tabList")[no].style.color = "rgb(150,150,150)";
      document.getElementsByClassName("tabList")[no].style.backgroundColor = "white";
    }
  }

  handleChange = (event, newValue) => {
    for (let i = 0; i < 5; i++) {
      if (i === newValue) {
        this.changeTabBackground(true, newValue);
      } else {
        this.changeTabBackground(false, i);
      }
    }
    this.setState({
      value: newValue,
    });
  };

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  render() {
    return (
      <div style={{ padding: "2% 1.5%" }}>
        <div style={{ display: "flex" }}>
          <Typography variant="h5" style={{ fontWeight: "bold", flex: 1 }}>
            รายการสั่งซื้อ
          </Typography>
          <TextField
            placeholder="SearchBox"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon style={{ color: "rgb(150,150,150)" }} />,
            }}
            variant="outlined"
          />
        </div>
        <div style={{ paddingBottom: "1%" }}>
          <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="รายการสั่งซื้อ" />
        </div>
        <Typography
          style={{
            color: "rgb(150,150,150)",
            paddingTop: "0.7%",
          }}>
          จำนวนสั่งซื้อ 25 รายการ
        </Typography>
        <div style={{ marginTop: "1%" }}>
          <AppBar position="static" style={classStyle.AppBar}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="simple tabs example"
              style={classStyle.TabsBox}
              classes={{
                flexContainer: "flexSpace",
              }}
              TabIndicatorProps={{
                style: { background: "sandybrown", height: "5px", width: "18.4%" },
              }}>
              <Tab
                style={classStyle.TabListStyle}
                className="tabList"
                onMouseEnter={() => {
                  this.changeTabBackground(true, 0);
                }}
                onMouseLeave={() => {
                  if (this.state.value !== 0) {
                    this.changeTabBackground(false, 0);
                  }
                }}
                label={<TabContainer label="Wait For Payment" number="1" />}
                {...this.a11yProps(0)}
              />
              <Tab
                style={classStyle.TabListStyle}
                className="tabList"
                onMouseEnter={() => {
                  this.changeTabBackground(true, 1);
                }}
                onMouseLeave={() => {
                  if (this.state.value !== 1) {
                    this.changeTabBackground(false, 1);
                  }
                }}
                label={<TabContainer label="Confirm Payment" number="2" />}
                {...this.a11yProps(1)}
              />
              <Tab
                style={classStyle.TabListStyle}
                className="tabList"
                onMouseEnter={() => {
                  this.changeTabBackground(true, 2);
                }}
                onMouseLeave={() => {
                  if (this.state.value !== 2) {
                    this.changeTabBackground(false, 2);
                  }
                }}
                label={<TabContainer label="Wait For Shipment" number="3" />}
                {...this.a11yProps(2)}
              />
              <Tab
                style={classStyle.TabListStyle}
                className="tabList"
                onMouseEnter={() => {
                  this.changeTabBackground(true, 3);
                }}
                onMouseLeave={() => {
                  if (this.state.value !== 3) {
                    this.changeTabBackground(false, 3);
                  }
                }}
                label={<TabContainer label="Completed" number="4" />}
                {...this.a11yProps(2)}
              />
              <Tab
                style={classStyle.TabListStyle}
                className="tabList"
                onMouseEnter={() => {
                  this.changeTabBackground(true, 4);
                }}
                onMouseLeave={() => {
                  if (this.state.value !== 4) {
                    this.changeTabBackground(false, 4);
                  }
                }}
                label={<TabContainer label="Cancel Order" number="5" />}
                {...this.a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <OrderTable order={this.state.order} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            Item four
          </TabPanel>{" "}
          <TabPanel value={this.state.value} index={4}>
            Item five
          </TabPanel>
        </div>
      </div>
    );
  }
}

export default OrderContainer;

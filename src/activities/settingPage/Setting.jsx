import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import General from "./cardSetting/General";
import Address from "./cardSetting/Address";
import Package from "./cardSetting/Package";
import { getSetting } from "../../config/setting";
import BreadCrumbs from "../../components/BreadCrumbs";
import Cards from "../../components/Element/CardCpn";
import EditPopup from "../../components/EditPopup";
import UpPackage from "../../components/DialogUpPackage";
import Contact from "./cardSetting/Contact";
import AlertDialog from "../../components/AlertDialog";
import UsageAmount from "./cardSetting/UsageAmount";
import Size from "../../utilities/SizeWindow";
import DropImg from "../../components/dragDropImg";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setting-tabpanel-${index}`}
      aria-labelledby={`setting-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `setting-tab-${index}`,
    "aria-controls": `setting-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  textHeader: {
    fontWeight: "bold",
  },
  alert: { marginLeft: "auto" },
}));

export default function SimpleTabs() {
  const tabs = [
    "ทั่วไป",
    "การขนส่ง",
    "ข้อความอัตโนมัติ",
    "ช่องทางเชื่อมต่อ",
    "บัญชีผู้ใช้",
  ];
  const [account, setAccount] = React.useState({
    general: {
      shopID: "",
      shopName: "",
      email: "",
      texCode: "",
      phone: "",
      package: {
        expire: 0,
        pack: 0,
        enroll: "",
      },
      address: {
        name: "",
        tel: "",
        detail: "",
        distrust: "",
        province: "",
        city: "",
        zipCode: "",
      },
      contact: {
        tel: "",
        phone: "",
        email: "",
        website: "",
        facebook: "",
        line: "",
        IG: "",
      },
    },
    transport: {
      main: "kerry",
      chooseList: {
        kerry: {
          perWeight: true,
          cost: {},
        },
      },
      JT: {
        name: "ton",
        id: "snt9691",
      },
      DHL: {
        id: "",
        token: "",
      },
    },
    autoText: {},
    chanelAPI: {},
    account: {
      email: "",
      telephone: "",
      name: "",
    },
  });
  const [oldAccount, setOldAccount] = React.useState({
    old: 1,
    general: {
      shopID: null,
      shopName: "",
      email: "",
      texCode: "",
      phone: "",
      package: {
        expire: 0,
        pack: 0,
        enroll: "",
      },
      address: {
        name: "",
        tel: "",
        detail: "",
        distrust: "",
        province: "",
        city: "",
        zipCode: "",
      },
      contact: {
        tel: "",
        phone: "",
        email: "",
        website: "",
        facebook: "",
        line: "",
        IG: "",
      },
    },
    transport: {
      main: "kerry",
      chooseList: {
        kerry: {
          perWeight: true,
          cost: {},
        },
      },
      JT: {
        name: "ton",
        id: "snt9691",
      },
      DHL: {
        id: "",
        token: "",
      },
    },
    autoText: {},
    chanelAPI: {},
    account: {
      email: "",
      telephone: "",
      name: "",
    },
  });
  const handleData = (value, tag) => {
    let items = { ...account };
    switch (tag.length) {
      case 1:
        items[tag[0]] = value;
        break;
      case 2:
        items[tag[0]][tag[1]] = value;
        break;
      case 3:
        items[tag[0]][tag[1]][tag[2]] = value;
        break;
      case 4:
        items[tag[0]][tag[1]][tag[2]][tag[3]] = value;
        break;
      default:
        break;
    }
    setAccount(items);
    let newConfig = { ...config };
    if (JSON.stringify(account) !== JSON.stringify(oldAccount)) {
      newConfig.edited = true;
      setConfig(newConfig);
    } else {
      newConfig.edited = false;
      setConfig(newConfig);
    }
  };
  //
  const [config, setConfig] = React.useState({
    alert: false,
    value: 0,
    edited: false,
  });
  const classes = useStyles();
  const handleChangeTabs = (event, newValue) => {
    if (config.edited) {
      let newConfig = { ...config };
      newConfig.value = newValue;
      newConfig.alert = true;
      setConfig(newConfig);
    } else {
      let newConfig = { ...config };
      newConfig.value = newValue;
      setConfig(newConfig);
    }
  };
  const saveAccount = () => {
    setOldAccount(JSON.parse(JSON.stringify(account)));
  };
  const undoAccount = () => {
    setAccount(JSON.parse(JSON.stringify(oldAccount)));
  };
  const changeAlert = (alert = false, edited = false) => {
    let newConfig = { ...config };
    newConfig.edited = edited;
    newConfig.alert = alert;
    setConfig(newConfig);
  };
  const append = (value) => {
    let update = { ...account };
    update["general"]["package"]["history"].append(value);
  };
  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    getSetting(setAccount, setOldAccount);
  }, []);
  return (
    <>
      <UpPackage
        open={open}
        setOpen={setOpen}
        append
        imgWidth={200}
        imgHeight={300}
      />
      <AlertDialog
        config={config}
        save={() => {
          changeAlert();
          saveAccount();
        }}
        cancel={() => {
          undoAccount();
          changeAlert();
        }}
      />
      <EditPopup
        edited={config.edited && !config.alert}
        save={() => {
          saveAccount();
          changeAlert();
        }}
        cancel={() => {
          undoAccount();
          changeAlert();
        }}
      />
      <div style={{ padding: "1% 0%" }}>
        <BreadCrumbs
          before={[{ href: "/dashboard", name: "หน้าแรก" }]}
          presentpage="ตั้งค่า"
        />
      </div>
      <Box marginBottom="1%">
        <Typography className={classes.textHeader} variant="h5">
          ตั้งค่า
        </Typography>
      </Box>
      <div>
        <AppBar position="static" color="inherit">
          <Tabs
            id="tabs"
            value={config.value}
            onChange={handleChangeTabs}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="full width tabs example"
          >
            {tabs.map((data, index) => (
              <Tab label={data} {...a11yProps({ index })} />
            ))}
          </Tabs>
        </AppBar>
        <TabPanel value={config.value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <General
                    handleData={handleData}
                    data={account.general}
                    oldData={oldAccount.general}
                    change={change}
                    setChange={setChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Address
                    handleData={handleData}
                    data={account.general.address}
                    oldData={oldAccount.general.address}
                    change={change}
                    setChange={setChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Contact
                    setChange={setChange}
                    handleData={handleData}
                    data={account.general.contact}
                    oldData={oldAccount.general.contact}
                    change={change}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={config.value} index={1}>
          <Box marginTop="1%">{/* <ContactButton /> */}</Box>
        </TabPanel>
        <TabPanel value={config.value} index={2}>
          <Box marginTop="1%">
            <Grid item xs={5}>
              <Cards></Cards>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={config.value} index={3}>
          <Box marginTop="1%">
            <DropImg />
          </Box>
        </TabPanel>
        <TabPanel value={config.value} index={4}>
          <Box marginTop="1%">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Package
                      onClick={handleClickOpen}
                      current={account.general.package}
                      old={oldAccount.general.package}
                      setChange={setChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <UsageAmount />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </div>
    </>
  );
}

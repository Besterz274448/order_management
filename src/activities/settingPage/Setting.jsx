import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Grid,
  ButtonGroup,
} from "@material-ui/core";
import General from "./cardSetting/General";
import Alert from "@material-ui/lab/Alert";
import Address from "./cardSetting/Address";
import { getSetting } from "../../config/setting";
import BreadCrumbs from "../../components/BreadCrumbs";
import Cards from "../../components/CardCpn";
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
  const dialogCancel = () => {
    changeAlert();
    undoAccount();
  };
  const dialogSave = () => {
    changeAlert();
    saveAccount();
    console.log(oldAccount.general.address.tel);
  };
  const changeAlert = (alert = false, edited = false) => {
    let newConfig = { ...config };
    newConfig.edited = edited;
    newConfig.alert = alert;
    setConfig(newConfig);
  };

  const [change, setChange] = React.useState(false);
  React.useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    getSetting(setAccount, setOldAccount);
  }, []);
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={config.edited && !config.alert}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Note archived"
      >
        <Alert
          severity="warning"
          action={
            <ButtonGroup variant="text" color="default" aria-label="">
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  changeAlert();
                  undoAccount();
                }}
              >
                ละทิ้ง
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  changeAlert();
                  saveAccount();
                }}
              >
                บันทึก
              </Button>
            </ButtonGroup>
          }
        >
          ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึก" เพื่อยืนยันการเปลี่ยนแปลง
        </Alert>
      </Snackbar>
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
            indicatorColor="secondary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="full width tabs example"
          >
            {tabs.map((data, index) => (
              <Tab label={data} {...a11yProps({ index })} />
            ))}
          </Tabs>
          <Dialog
            open={config.alert}
            onClose={dialogCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"ข้อมูลมีการเปลี่ยนแปลง"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ต้องการบันทึกหรือไม่
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={dialogCancel} color="primary">
                ละทิ้ง
              </Button>
              <Button onClick={dialogSave} color="primary" autoFocus>
                บันทึก
              </Button>
            </DialogActions>
          </Dialog>{" "}
        </AppBar>
        <TabPanel value={config.value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <General
                handleData={handleData}
                data={account.general}
                oldData={oldAccount.general}
                change={change}
                setChange={setChange}
              />
            </Grid>
            <Grid lg={6} xs={0}></Grid>
            <Grid item xs={12} lg={6}>
              <Address
                handleData={handleData}
                data={account.general.address}
                oldData={oldAccount.general.address}
                change={change}
                setChange={setChange}
              />
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
          <Box marginTop="1%">Item 4</Box>
        </TabPanel>
        <TabPanel value={config.value} index={4}>
          <Box marginTop="1%">Item 5</Box>
        </TabPanel>
      </div>
    </>
  );
}

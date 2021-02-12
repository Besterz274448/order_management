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
  Divider,
} from "@material-ui/core";
import General from "./general/General";
import Alert from "@material-ui/lab/Alert";
import Address from "./general/Address";
import { getSetting } from "../../config/setting";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setting-tabpanel-${index}`}
      aria-labelledby={`setting-tab${index}`}
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
    id: `setting-tab${index}`,
    "aria-controls": `setting-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChangeTabs = (event, newValue) => setValue(newValue);
  const tabs = [
    "ทั่วไป",
    "การขนส่ง",
    "ข้อความอัตโนมัติ",
    "ช่องทางเชื่อมต่อ",
    "บัญชีผู้ใช้",
  ];
  const [edited, setEdited] = React.useState(false);
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
    if (JSON.stringify(account) !== JSON.stringify(oldAccount)) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  };

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
  const [change, setChange] = React.useState(false);

  React.useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    getSetting(setAccount, setOldAccount);
  }, []);
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChangeTabs}
            indicatorColor="secondary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            {tabs.map((data, index) => (
              <Tab label={data} {...a11yProps({ index })} />
            ))}
          </Tabs>
        </AppBar>
        {edited ? (
          <Alert
            action={
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={(e) => {
                  setOldAccount(JSON.parse(JSON.stringify(account)));
                  setEdited(false);
                }}
              >
                บันทึก
              </Button>
            }
          >
            ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึกข้อมูล"
            เพื่อยืนยันการเปลี่ยนแปลง
          </Alert>
        ) : null}
        <TabPanel value={value} index={0}>
          <div style={{ marginTop: !edited ? "3.35rem" : "0rem" }}>
            <General
              handleData={handleData}
              data={account.general}
              oldData={oldAccount.general}
              change={change}
              setChange={setChange}
            />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Address
              handleData={handleData}
              data={account.general.address}
              oldData={oldAccount.general.address}
              change={change}
              setChange={setChange}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ marginTop: !edited ? "3.35rem" : "0rem" }}>
            testesss
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div style={{ marginTop: !edited ? "3.35rem" : "0rem" }}>
            Item Three
          </div>
        </TabPanel>
      </div>
    </>
  );
}

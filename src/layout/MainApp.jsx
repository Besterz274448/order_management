import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Routes from "../routes/Routes";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TvIcon from "@material-ui/icons/Tv";
import ReceiptIcon from "@material-ui/icons/Receipt";
import FlagIcon from "@material-ui/icons/Flag";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue,red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    backgroundColor:"rgb(251,251,251)"
  },
}));

export default function MainApp({ selected }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const sideBarIcon = [
    { icon: DashboardIcon, text: "สรุปผล", path: "/dashboard" ,type:"product"},
    { icon: StoreMallDirectoryIcon, text: "รายการสินค้า", path: "/product",type:"product",subLink:[
      {
        icon: StoreMallDirectoryIcon, text: "เพิ่มสินค้า", path: "/product/addproduct",
      }
    ]},
    { icon: ShoppingCartIcon, text: "รายการคำสั่งซื้อ", path: "/order",type:"product"},
    { icon: TvIcon, text: "ไลฟ์สด", path: "/livestream",type:"product"},
    { icon: FlagIcon, text: "แคมเปญ", path: "/campaign",type:"shop_manage"},
    { icon: NotificationsActiveIcon, text: "โปรโมชั่น", path: "/promotion",type:"shop_manage"},
    { icon: ReceiptIcon, text: "รายงาน", path: "/report",type:"shop_manage"},
    { icon: PersonAddIcon, text: "รายชื่อผู้ติดต่อ", path: "/contact",type:"lead"},
    { icon: SettingsIcon, text: "ตั้งค่า", path: "/setting",type:"shop_manage"},
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: blue[700],
      },
      secondary: {
        // This is green.A700 as hex.
        main: red[700],
      },
      default:{
        main: "white"
      }
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} sideBarIcon={sideBarIcon} />
          <div className={classes.content}>
            <Routes />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

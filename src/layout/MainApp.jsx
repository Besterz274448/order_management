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
import { blue} from '@material-ui/core/colors';

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
  React.useEffect(()=>{
    const path = window.location.pathname.split('/');
    if(path[1] !==  ""){
      const index = sideBarIcon.map(data => data.path).indexOf("/"+path[1]);
      if(index !== -1){
        const word = sideBarIcon[index].text;
        setPage(word);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
    { icon: PersonAddIcon, text: "รายชื่อผู้ติดต่อ", path: "/contract",type:"lead"},
    { icon: SettingsIcon, text: "ตั้งค่า", path: "/setting",type:"shop_manage"},
  ];

  

  const [page,setPage] = useState('สรุปผล');
  
  const handlePage = (text) =>{
    setPage(text);
  }

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
        main: "#00C9A7",
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
          <Navbar open={open} handleDrawerOpen={handleDrawerOpen} page={page}/>
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} handlePage={handlePage}  sideBarIcon={sideBarIcon} />
          <div className={classes.content}>
            <Routes />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

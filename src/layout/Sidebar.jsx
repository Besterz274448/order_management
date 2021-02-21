import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import { MenuOpen } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    background: "rgb(35,48,68)",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  textLink: {
    textDecoration: "none",
    color: "rgb(210,210,210)",
  },
  listIcon: {
    color: "rgb(136,143,153)",
  },
  textColor: {
    color: "rgb(200,200,200)",
  },
  textColor: {
    color: "rgb(112, 112, 112)",
  },
}));

export default function Sidebar({ open, handleDrawerClose, sideBarIcon }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openCollapse, setCollapse] = React.useState(false);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <div>
          <img
            src="https://i7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png"
            alt="logoImage"
            width="25px"
          />
          <span
            style={{ color: "rgb(220,220,220)", fontWeight: "bold", fontSize: "18px", verticalAlign: "top", paddingLeft: "5px" }}>
            CF Management
          </span>
        </div>
        <IconButton className={classes.listIcon} onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider style={{ backgroundColor: "rgb(100,100,100)" }} />
      {open && (
        <ListItem>
          <Typography className={classes.textColor}>การจัดการสินค้า</Typography>
        </ListItem>
      )}
      <List>
        {sideBarIcon
          .filter((data) => data.type === "product")
          .map((data) => (
              <NavLink key={data.text} to={data.path} className={classes.textLink}>
                <ListItem button key={data.text}>
                  <ListItemIcon className={classes.listIcon}>{<data.icon />}</ListItemIcon>
                  <ListItemText style={{ fontWeight: "bold" }} primary={data.text} />
                </ListItem>                           
              </NavLink>
          ))}
      </List> 
      <Divider style={{ backgroundColor: "rgb(100,100,100)" }} />
      {open && (
        <ListItem>
          <Typography className={classes.textColor}>รายชื่อผู้ติดต่อ</Typography>
        </ListItem>
      )}
      <List>
        {sideBarIcon
          .filter((data) => data.type === "lead")
          .map((data) => (
            <NavLink key={data.text} to={data.path} className={classes.textLink}>
              <ListItem button key={data.text}>
                <ListItemIcon className={classes.listIcon}>{<data.icon />}</ListItemIcon>
                <ListItemText style={{ fontWeight: "bold" }} primary={data.text} />
              </ListItem>
            </NavLink>
          ))}
      </List>
      <Divider style={{ backgroundColor: "rgb(100,100,100)" }} />
      {open && (
        <ListItem>
          <Typography className={classes.textColor}>จัดการข้อมูลร้านค้า</Typography>
        </ListItem>
      )}
      <List>
        {sideBarIcon
          .filter((data) => data.type === "shop_manage")
          .map((data) => (
            <NavLink key={data.text} to={data.path} className={classes.textLink}>
              <ListItem button key={data.text}>
                <ListItemIcon className={classes.listIcon}>{<data.icon />}</ListItemIcon>
                <ListItemText style={{ fontWeight: "bold" }} primary={data.text} />
              </ListItem>
            </NavLink>
          ))}
      </List>
    </Drawer>
  );
}

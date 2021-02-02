import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import BreadCrumbs from "../../components/BreadCrumbs";
import Tooltip from "@material-ui/core/Tooltip";
// import FilterBox from "./FilterBox";

const useHeaderStyles = makeStyles((theme) => ({
  root: {},
  textHeader: {
    fontWeight: "bold",
  },
  textSub: {
    color: "rgb(150,150,150)",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    paddingBottom:"1%",
  },
  searchIcon: {
    color: "rgb(150,150,150)",
  },
  marginBox: {
    marginRight: "0.5%",
  },
}));

export default function ProductListHeader(props) {
  const classes = useHeaderStyles();
  return (
    <div>
      <div style={{ padding: "1% 0%" }}>
        <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="รายการสินค้า" />
      </div>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textHeader} variant="h5">
          รายการสินค้า
        </Typography>
        <Typography className={classes.marginBox}>
          <Tooltip title="เพิ่มสินค้าใหม่">
            <Button color="primary" variant="contained" style={{ marginRight: "0%" }} onClick={props.handleClickOpen}>
              <AddCircleIcon />
              เพิ่มสินค้า
            </Button>
          </Tooltip>
        </Typography>
      </ListItem>
      <ListItem  className={classes.flexBox}>
        <Typography className={classes.textSub}>รายการสินค้าทั้งหมด {props.dataLength} รายการ</Typography>
      </ListItem>
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import BreadCrumbs from "../../components/BreadCrumbs";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    padding:0
  },
  searchIcon: {
    color: "rgb(150,150,150)",
  },
  marginBox: {
    marginRight: "0.5%",
  },
}));

const numeric_record = ["Price", "Stock", "Sold"];

const filterLabel = [
  { id: "id", label: "รหัสสินค้า" },
  { id: "Name", label: "ชื่อสินค้า" },
  { id: "Price", label: "ราคา" },
  { id: "Stock", label: "คงเหลือ" },
  { id: "Sold", label: "ขายแล้ว" },
  { id: "Category", label: "ประเภท" },
];

const mathLabel = [
  { id: ">", label: ">" },
  { id: "<", label: "<" },
  { id: "=", label: "=" },
  { id: "[]", label: "ระหว่าง" },
];

export default function ProductListHeader(props) {
  const classes = useHeaderStyles();
  return (
    <div>
     <div style={{padding:"1% 0%"}}>
        <BreadCrumbs
          before={[{ href: "/dashboard", name: "หน้าแรก" }]}
          presentpage="รายการสินค้า"
        />
      </div>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textHeader} variant="h5">
          รายการสินค้า
        </Typography>
        <Typography className={classes.marginBox}>
          อัพเดทล่าสุด : {props.date}
        </Typography>
      </ListItem>
    </div>
  );
}


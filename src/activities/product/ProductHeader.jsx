import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import BreadCrumbs from "../../components/BreadCrumbs";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import FilterBox from "../../components/FilterBox";

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
    paddingBottom: "1%",
  },
  searchIcon: {
    color: "rgb(150,150,150)",
  },
  marginBox: {
    marginRight: "0.5%",
  },
  textInput: {
    [`& fieldset`]: {
      borderRadius: "5px",
    },
    [`& input`]: {
      textAlign: "center",
    },
    marginLeft:"5px"

  },
}));

const filterLabel = [
  { id: "sku", label: "รหัส SKU" },
  { id: "name", label: "ชื่อสินค้า" },
  { id: "price", label: "ราคา" },
  { id: "order", label: "จำนวนสั่งซื้อ" },
  { id: "sold", label: "ขายแล้ว" },
  { id: "stock", label: "คงเหลือ" },
];

const isNumeric = ["price", "order", "sold", "stock"];

const mathLabel = [
  { id: ">", label: "มากกว่า" },
  { id: "<", label: "น้อยกว่า" },
  { id: "=", label: "เท่ากับ" },
  { id: "[]", label: "ระหว่าง" },
];

export default function ProductListHeader(props) {
  const classes = useHeaderStyles();
  const index = filterLabel.map((data) => data.id).indexOf(props.filter);
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
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textSub}>รายการสินค้าทั้งหมด {props.dataLength} รายการ</Typography>
        <div>
          {props.tabSelected === 1 ? (
            <FilterBox
              data={filterLabel}
              minWidth={60}
              maxWidth={150}
              filterSelected={props.filter}
              handleChangeSelected={props.handleChangeFilter}
            />
          ) : (
            false
          )}
          {props.tabSelected === 1 && isNumeric.indexOf(props.filter) !== -1 ? (
            <FilterBox
              data={mathLabel}
              minWidth={100}
              filterSelected={props.operation}
              handleChangeSelected={props.handleChangeOperation}
            />
          ) : (
            false
          )}
          <TextField
            className={classes.textInput}
            variant="outlined"
            value={props.search_key}
            type={isNumeric.indexOf(props.filter) !== -1 ? "number" : "text"}
            onChange={(event) => {
              props.handleSearchData("search_key", event.target.value);
            }}
            style={{ width: "210px" }}
            size="small"
            placeholder={props.tabSelected === 0 ? "ค้นหาสินค้าจากชื่อสินค้า . . ." : "ค้นหาสินค้าจาก" + filterLabel[index].label}
          />
          {props.tabSelected === 1 && props.operation === "[]" ? (
            <TextField
              className={classes.textInput}
              variant="outlined"
              value={props.search_key2}
              type="number"
              onChange={(event) => {
                props.handleSearchData("search_key2", event.target.value);
              }}
              style={{ width: "210px" }}
              size="small"
              placeholder={
                props.tabSelected === 0 ? "ค้นหาสินค้าจากชื่อสินค้า . . ." : "ค้นหาสินค้าจาก" + filterLabel[index].label
              }
            />
          ) : (
            false
          )}
        </div>
      </ListItem>
    </div>
  );
}

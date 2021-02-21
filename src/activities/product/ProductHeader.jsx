import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BreadCrumbs from "../../components/BreadCrumbs";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterBox from "../../components/FilterBox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  textTab: {
    fontWeight: "bold",
  },
  search_container: {
    width: "100%",
    marginTop: "0.2%",
    backgroundColor: "white",
    padding: "8px",
    boxShadow: "3px 2px 2px rgb(215,215,215)",
  },
  search_field: {
    marginRight: "8px",
    verticalAlign: "bottom",
    color: "rgb(150,150,150)",
    [`& p`]: {
      paddingBottom: "4px",
    },
  },
});
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

export default function ProductHeader(props) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="product_header_container">
      <div style={{ padding: "1% 1.5%" }}>
        <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="รายการสินค้า" />
      </div>
      <Tabs
        value={props.tabSelected}
        indicatorColor="primary"
        textColor="primary"
        onChange={props.handleChangeTabs}
        aria-label="disabled tabs example">
        <Tab className={classes.textTab} label="รายการสินค้าหลัก" />
        <Tab className={classes.textTab} label="รายการสินค้าทั้งหมด" />
        <Tab className={classes.textTab} label="รายการสินค้าที่จำนวนใกล้หมด" />
      </Tabs>
      <div className={classes.search_container}>
        <ListItem>
          <div className={classes.search_field} style={{ width: "20%" }}>
            <p>Search By</p>
            <TextField
              id="searchbox1"
              variant="outlined"
              fullWidth
              disabled={props.tabSelected === 2 ? true : false}
              placeholder={"ค้นหาสินค้าจาก" + filterLabel.filter((data) => data.id === props.filter)[0].label}
              value={props.search_key}
              onChange={(event) => {
                props.handleSearchData("search_key", event.target.value);
              }}
              type={isNumeric.indexOf(props.filter) === -1 ? "text" : "number"}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.search_field} style={{ width: "20%" }}>
            <p>&nbsp;</p>
            <TextField
              id="searchbox2"
              variant="outlined"
              fullWidth
              placeholder="ค้นหาสินค้าจาก"
              size="small"
              value={props.search_key2}
              onChange={(event) => {
                props.handleSearchData("search_key2", event.target.value);
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              placeholder={"ค้นหาสินค้า" + filterLabel.filter((data) => data.id === props.filter)[0].label}
              disabled={props.operation === "[]" ? false : true}
              type={isNumeric.indexOf(props.filter) === -1 ? "text" : "number"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.search_field}>
            <p>Filter By</p>
            <FilterBox
              disabled={props.tabSelected !== 1 ? true : false}
              data={filterLabel}
              minWidth={150}
              filterSelected={props.filter}
              handleChangeSelected={props.handleChangeFilter}
            />
          </div>
          <div className={classes.search_field}>
            <p>&nbsp;</p>
            <FilterBox
              disabled={isNumeric.indexOf(props.filter) === -1 ? true : false}
              data={mathLabel}
              minWidth={150}
              filterSelected={props.operation}
              handleChangeSelected={props.handleChangeOperation}
            />
          </div>
          <div className={classes.search_field} style={{ marginLeft: "auto" }}>
            <p>&nbsp;</p>
            <NavLink to="/product/addproduct" style={{ textDecoration: "none" }}>
              <Tooltip title="เพิ่มสินค้าใหม่">
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: "0%" }}
                  onClick={() => {
                    props.handleClickOpen("addModal");
                  }}>
                  <AddCircleIcon />
                  เพิ่มสินค้า
                </Button>
              </Tooltip>
            </NavLink>
          </div>
        </ListItem>
      </div>
    </div>
  );
}

import React from "react";
import clsx from "clsx";
import BreadCrumbs from "../../components/BreadCrumbs";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterBox from "../../components/FilterBox";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

const useStyle = makeStyles({
  buttonSpace: {
    marginLeft: "8px",
  },
  orderTabs: {
    marginTop: "1%",
  },
  search_container: {
    width: "100%",
    marginTop: "0.2%",
    backgroundColor: "white",
    padding: "8px",
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
  { id: "order_id", label: "เลขคำสั่งซื้อ" },
  { id: "fullname", label: "ชื่อลูกค้า" },
];

function formattedDate(d) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
}

export default function OrderHeader(props) {
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const handleDateChange = (date) => {
    props.handleChangeFilter("order_date");
    props.handleSearchData(formattedDate(date));
    setSelectedDate(date);
  };

  return (
    <div style={{ padding: "1% 1.5%" }}>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div>
          <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="รายการคำสั่งซื้อ" />
        </div>
        <div>
          <NavLink to="/product/addproduct" style={{ textDecoration: "none" }}>
            <Tooltip title="สร้างคำสั่งซื้อ">
              <Button className={clsx(classes.buttonSpace, "hello-world")} variant="contained" color="primary">
                <PostAddIcon />
                สร้างคำสั่งซื้อ
              </Button>
            </Tooltip>
          </NavLink>
          <Button className={classes.buttonSpace} variant="contained" color="primary">
            <AssessmentIcon />
            พิมพ์รายงาน
          </Button>
        </div>
      </div>
      <div className={classes.orderTabs}>
        <Paper elevation={2}>
          <Tabs
            value={props.tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={props.handleTab}
            aria-label="disabled tabs example">
            <Tab label="รอชำระเงิน" />
            <Tab label="รอตรวจสอบ" />
            <Tab label="รอการจัดส่ง" />
            <Tab label="สำเร็จ" />
            <Tab label="ยกเลิก" />
          </Tabs>
        </Paper>
      </div>
      <Paper className={classes.search_container}>
        <ListItem>
          <div className={classes.search_field} style={{ width: "50%" }}>
            <p>Search By</p>
            <TextField
              id="searchbox1"
              variant="outlined"
              fullWidth
              disabled={props.tabSelected === 2 ? true : false}
              placeholder={"ค้นหาสินค้าจาก"}
              value={props.search_key}
              onChange={(event) => {
                props.handleSearchData(event.target.value);
              }}
              type={"text"}
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
          <div className={classes.search_field}>
            <p>Filter By</p>
            <FilterBox
              data={filterLabel}
              minWidth={150}
              filterSelected={props.filter}
              handleChangeSelected={props.handleChangeFilter}
            />
          </div>
          <div className={classes.search_field}>
            <p>เลือกวันที่</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.search_field} style={{ marginLeft: "auto" }}>
            <p>&nbsp;</p>
            <Button className={clsx(classes.buttonSpace, "hello-world")} variant="contained" color="primary">
              <SearchIcon />
              ค้นหาข้อมูล
            </Button>
          </div>
        </ListItem>
      </Paper>
    </div>
  );
}

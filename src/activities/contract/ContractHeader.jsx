import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterBox from "../../components/FilterBox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  textTab: {
    fontWeight: "bold",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
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
  buttonSpace: {
    marginLeft: "9px",
  },
});

const filterLabel = [
  { id: "facebook", label: "facebook" },
  { id: "fullname", label: "ชื่อ-นามสกุล" },
  { id: "address", label: "ที่อยู่" },
];

export default function ProductHeader(props) {
  const classes = useStyles();
  const [expanded, setExtended] = React.useState(false);
  return (
    <div className="product_header_container">
      <div style={{ padding: "1% 1.5%" }}>
        <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="รายชื่อผู้ติดต่อ" />
      </div>
      <div className={classes.search_container}>
        <ListItem>
          <div className={classes.search_field} style={{ width: "60%" }}>
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
              disabled={false}
              data={filterLabel}
              minWidth={150}
              filterSelected={props.filter}
              handleChangeSelected={props.handleChangeFilter}
            />
          </div>
          <div className={classes.search_field} style={{ marginLeft: "auto" }}>
            <p>&nbsp;</p>
            <Tooltip title="เพิ่มสินค้าใหม่">
              <Button
                onClick={() => {
                  setExtended(!expanded);
                }}
                color="primary"
                variant="contained"
                style={{ marginRight: "0%" }}>
                <AddCircleIcon />
                เพิ่มรายชื่อผู้ติดต่อ
              </Button>
            </Tooltip>
          </div>
        </ListItem>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper style={{ padding: "1% 1.5%" }}>
          <div className={classes.flexContainer} style={{ width: "100%" }}>
            <Typography>เพิ่มรายชื่อผู้ติดต่อ</Typography>
            <div>
              <Button className={classes.buttonSpace} variant="contained" color="secondary">
                ยกเลิก
              </Button>
              <Button className={classes.buttonSpace} variant="contained" color="primary">
                บันทึก
              </Button>
            </div>
          </div>
          <div className={classes.flexContainer} style={{ marginTop: "9px" }}>
            <div style={{ width: "55%" }}>
              <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="facebook url"
                size="small"></TextField>
              <div className={classes.flexContainer} style={{marginTop:"12px"}}>
                <div style={{ width: "54%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="ชื่อ-นามสกุล"
                    size="small"></TextField>
                </div>
                <div style={{ width: "25%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="เบอร์โทรศัพท์"
                    size="small"></TextField>
                </div>
                <div style={{ width: "19%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="รหัสไปรษณีย์"
                    size="small"></TextField>
                </div>
              </div>
            </div>
            <div style={{ width: "44%" }}>
              <TextField
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="ที่อยู่"
                size="small"></TextField>
            </div>
          </div>
        </Paper>
      </Collapse>
    </div>
  );
}

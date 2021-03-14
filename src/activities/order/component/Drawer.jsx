import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import OrderDetailTable from "./OrderDetailTable";
const useStyles = makeStyles({
  container: {
    padding: "10px 30px",
  },
  list: {
    width: 950,
  },
  fullList: {
    width: "auto",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spacePadding: {
    padding: "9px 0px",
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(true);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation">
      <div className="order_detail_page">
        <div className={clsx(classes.container)}>
          <div className={clsx(classes.flexContainer, classes.spacePadding)}>
            <Typography variant="h6">รายละเอียดคำสั่งซื้อหมายเลข : {props.selected_data}</Typography>
            <Typography>
              <IconButton
                onClick={(e) => {
                  props.toggleDrawer(e, false);
                }}
                style={{ padding: 0 }}>
                <CloseIcon />
              </IconButton>
            </Typography>
          </div>
          <div className={classes.flexContainer}>
            <Typography variant="span">
              <b>ผู้สั่งซื้อ</b> :{" "}
              <img
                alt="iconlink"
                src="https://image.flaticon.com/icons/png/512/124/124010.png"
                width="13px"
                style={{ marginRight: "5px" }}
              />
              Facebook Name
            </Typography>
            <Typography variant="span"></Typography>
            <Typography variant="span">
              <b>status</b> :{" "}
              <Chip variant="outlined" color="primary" label="OrderStatus">
                Order Status
              </Chip>
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={clsx(classes.container)}>
          <div className={classes.flexContainer}>
            <Typography>ข้อมูลที่อยู่สำหรับจัดส่งสินค้า</Typography>
            <Typography>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Typography>
          </div>
          <div className={classes.flexContainer}>
            <div style={{ width: "49%" }}>
              <TextField
                fullWidth
                required
                disabled={edit}
                id="filled-required"
                label="ชื่อผู้รับ"
                defaultValue="Hello World"
                size="small"
                variant="outlined"
              />
            </div>
            <div style={{ width: "49%" }}>
              <TextField
                fullWidth
                disabled={edit}
                required
                id="filled-required"
                label="เบอร์โทรศัพท์"
                defaultValue="Hello World"
                size="small"
                variant="outlined"
              />
            </div>
          </div>
          <div className={clsx(classes.flexContainer, classes.spacePadding)} style={{ marginTop: "5px" }}>
            <div style={{ width: "69%" }}>
              <TextField
                fullWidth
                disabled={edit}
                required
                id="filled-required"
                label="ที่อยู่สำหรับจัดส่ง"
                defaultValue="Hello World"
                size="small"
                variant="outlined"
              />
            </div>
            <div style={{ width: "30%" }}>
              <TextField
                fullWidth
                disabled={edit}
                required
                id="filled-required"
                label="รหัสไปรษณีย์"
                defaultValue="Hello World"
                size="small"
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <div className={clsx(classes.container)}>
          <div className={classes.flexContainer}>
            <Typography>สถานะการชำระเงิน : Status</Typography>
            <Typography>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}>
                ดูหลักฐานการชำระเงิน
              </Link>
            </Typography>
          </div>
        </div>
        <Divider />
        <div style={{ padding: "9px 9px", backgroundColor: "rgb(240,240,240)" }}>
          <OrderDetailTable />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment key={props.position}>
        <Drawer
          anchor={props.position}
          open={props.drawer}
          onClose={(e) => {
            props.toggleDrawer(e, false);
          }}>
          {list(props.position)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

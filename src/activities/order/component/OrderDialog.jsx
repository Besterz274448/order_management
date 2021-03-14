import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";
import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import OrderDetailTable from "./OrderDetailTable";

const useStyles = makeStyles({
  container: {
    padding: "9px 0px",
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

export default function AlertDialog(props) {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  return (
    <div>
      <Dialog maxWidth="md" fullWidth open={props.open} onClose={props.closeDialog}>
        <DialogTitle>
          <div className={classes.flexContainer}>
            <Typography variant="h6">รายละเอียดคำสั่งซื้อหมายเลข : {props.selected_data}</Typography>
            <Typography variant="span" style={{ fontSize: "16px" }}>
              <b>status : </b>
              <Chip variant="outlined" color="primary" label="OrderStatus">
                Order Status
              </Chip>
            </Typography>
          </div>
          <div className={classes.flexContainer} style={{ marginTop: "7px" }}>
            <Typography variant="span" style={{ fontSize: "16px" }}>
              <b>ผู้สั่งซื้อ</b> :
              <img
                alt="iconlink"
                src="https://image.flaticon.com/icons/png/512/124/124010.png"
                width="15px"
                style={{ marginRight: "5px" }}
              />
              Facebook Name
            </Typography>
            <Typography>
              <b>เลขพัสดุ</b> : <TextField size="small" placeholder=""></TextField>
            </Typography>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
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
                <div style={{ width: "45%" }}>
                  <div style={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      disabled={edit}
                      required
                      id="filled-required"
                      label="ชื่อผู้รับ"
                      defaultValue="Hello World"
                      size="small"
                      variant="outlined"
                    />
                  </div>
                  <div className={classes.flexContainer}>
                    <div style={{ width: "60%" }}>
                      <TextField
                        style={{ marginTop: "16px" }}
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
                    <div style={{ width: "39%" }}>
                      <TextField
                        style={{ marginTop: "16px" }}
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
                <div style={{ width: "54%" }}>
                  <div style={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      disabled={edit}
                      required
                      id="filled-required"
                      label="ที่อยู่สำหรับจัดส่ง"
                      defaultValue="Hello World"
                      size="small"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(classes.container)}>
              <div className={classes.flexContainer} style={{ padding: "9px 0px" }}>
                <Typography>
                  สถานะการชำระเงิน : <Chip size="small" color="primary" label="Status"></Chip>
                </Typography>
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
            <div style={{ padding: "3px 3px" }}>
              <OrderDetailTable />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            พิมพ์ใบปะหน้า
          </Button>
          <Button onClick={props.closeDialog} variant="contained" color="primary" autoFocus>
            ยืนยัน
          </Button>
          <Button onClick={props.closeDialog} variant="contained" color="secondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

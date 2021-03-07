import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <span>
            {props.changed === "none" && "จัดการคุณลักษณะของสินค้า"}
            {props.changed === "changed" && (
              <Alert severity="warning">กรุณากดบันทึก ! พื่อทำการบันทึกข้อมูลคุณลักษณะของสินค้า</Alert>
            )}
            {props.changed === "error" && <Alert severity="error">กรุณากรอกข้อมูลให้ครบถ้วน ! ก่อนทำการบันทึกข้อมูล </Alert>}
            {props.changed === "max" && <Alert severity="error">ไม่สามารถเพิ่มได้ ! จำนวนของคุณลักษณะเกินกำหนด </Alert>}
          </span>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="secondary">
            ยกเลิก
          </Button>
          <Button onClick={props.handleAttr} color="primary" autoFocus>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

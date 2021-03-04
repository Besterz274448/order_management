import {
  Dialog,
  DialogTitle,
  Button,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import BTCustom from "./Element/BTCustom";
import React from "react";

export default (props) => {
  const { config, cancel, save } = props;
  return (
    <Dialog
      open={config.alert}
      onClose={cancel}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">
        {"ข้อมูลมีการเปลี่ยนแปลง"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="edit-dialog-description">
          ต้องการบันทึกหรือไม่
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <BTCustom onClick={cancel} color="secondary">
          ละทิ้ง
        </BTCustom>
        <BTCustom onClick={save} color="primary" autoFocus>
          บันทึก
        </BTCustom>
      </DialogActions>
    </Dialog>
  );
};

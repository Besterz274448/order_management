import React from "react";
import { Snackbar, ButtonGroup, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import BTCustom from "./Element/BTCustom";
export default (props) => {
  const { save, cancel, edited } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={edited}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity="warning"
        action={
          <ButtonGroup variant="contained" color="default" aria-label="">
            <BTCustom color="secondary" size="small" onClick={cancel}>
              ละทิ้ง
            </BTCustom>
            <BTCustom color="primary" size="small" onClick={save}>
              บันทึก
            </BTCustom>
          </ButtonGroup>
        }
      >
        {
          'ข้อมูลมีการเปลี่ยนแปลง! กรุณากดปุ่ม "บันทึก" เพื่อยืนยันการเปลี่ยนแปลง'
        }
      </Alert>
    </Snackbar>
  );
};

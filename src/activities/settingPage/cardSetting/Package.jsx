import React from "react";
import Cards from "../../../components/Element/CardCpn";
import ExtensionIcon from "@material-ui/icons/Extension";
import { Typography, Button } from "@material-ui/core";
import BTCustom from "../../../components/Element/BTCustom";

export default (props) => {
  const { old, current, onClick: handleClickOpen } = props;
  const packages = [
    "หมดอายุการใช้งาน",
    "ทดลองใช้งาน",
    "รอการตรวจสอบ",
    "BASIC",
    "COMMON",
    "MAJOR",
  ];
  const expire = new Date().getTime() > current.expire;
  return (
    <Cards
      title={"แพคเกจปัจจุบัน: " + packages[current.pack]}
      icon={<ExtensionIcon />}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="subtitle1" display="block" align="center">
          {current.pack !== old.pack
            ? "กำลังดำเนินการเปลี่ยนแพ็คเกจ!! กรุณารอการยืนยัน"
            : expire === true
            ? `หมดอายุ วันที่ ${new Date(
                current.expire
              ).toLocaleDateString()} ต้องต่ออายุการใช้งาน`
            : `จะหมดอายุในวันที่ ${new Date(
                current.expire
              ).toLocaleDateString()}`}
        </Typography>
        <BTCustom
          variant="contained"
          size="large"
          color="primary"
          onClick={handleClickOpen}
        >
          {"อัพเกรดแพ็คเกจ"}
        </BTCustom>
      </div>
    </Cards>
  );
};

import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import TextFields from "../../../components/TextFieldCustom";
import UpPackage from "../../../components/DialogUpPackage";
import Cards from "../../../components/CardCpn";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  boxInput: { marginLeft: "0%" },
  formInput: { width: "100%", margin: "8px" },
  inputText: { color: "rgb(70,70,70)" },
  FormControl: { width: "100%" },
  packageFrom: { width: "38.1%", margin: "8px" },
  button: {
    width: "100%",
    color: "rgb(220, 220, 220)",
    backgroundColor: "rgb(61, 120, 204)",
    "&:hover": {
      backgroundColor: "rgb(58, 150, 194)",
      color: "rgb(255, 255, 255)",
    },
  },
}));
export default function InputWithIcon(props) {
  const packages = [
    "หมดอายุการใช้งาน",
    "ทดลองใช้งาน",
    "รอการตรวจสอบ",
    "BASIC",
    "COMMON",
    "MAJOR",
  ];
  const classes = useStyles();
  const [data, setData] = useState({
    shopName: "",
    email: "",
    shopID: "",
    package: { expire: 1612425076244, pack: 0, enroll: "" },
    address: {
      phone: "",
      detail: "",
      distrust: "",
      province: "",
      city: "",
      zipCode: "",
    },
    texCode: "",
  });
  const [open, setOpen] = React.useState(false);
  const expire = new Date().getTime() > data.package.expire;
  const handleOnBlur = (value, tag) => {
    if (props.change) {
      props.handleData(value, ["general", tag]);
      props.setChange(false);
    }
  };
  const handleOnChange = (value, tag) => {
    let update = { ...data };
    update[tag] = value;
    setData(update);
    props.setChange(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);
  return (
    <Cards
      classes={classes.cardSize}
      title={"ข้อมูลร้านค้า"}
      icon={<InfoIcon />}
    >
      <Box className={classes.boxInput} display="flex">
        <TextField
          label="รหัสร้านค้า"
          className={classes.packageFrom}
          value={data.shopID}
          helperText="ใช้สำหรับแจ้งเจ้าหน้าที่เพื่อติดต่อ"
          disabled
          size="small"
          margin="normal"
          variant="outlined"
          onChange={() => {
            alert("คุณกำลังแก้ไขโค๊ด ไม่สามารถดำเนินการได้");
          }}
        />
        {/* package */}
        <TextField
          label="แพ็คเกจ"
          error={expire || data.package.pack !== props.oldData.package.pack}
          className={classes.packageFrom}
          value={packages[data.package.pack]}
          helperText={
            data.package.pack !== props.oldData.package.pack
              ? "กำลังดำเนินการเปลี่ยนแพ็คเกจ!! กรุณากดบันทึกเพื่อยืนยันการเปลี่ยน"
              : expire === true
              ? `หมดอายุ เมื่อวันที่ ${new Date(
                  data.package.expire
                ).toLocaleDateString()} ต้องต่ออายุการใช้งาน`
              : `จะหมดอายุในวันที่ ${new Date(
                  data.package.expire
                ).toLocaleDateString()}`
          }
          disabled
          size="small"
          margin="normal"
          variant="outlined"
        />
        <Box mt={1}>
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            onClick={handleClickOpen}
          >
            {"อัพเกรดแพ็คเกจ"}
          </Button>
          <UpPackage open={open} setOpen={setOpen} />
        </Box>
      </Box>
      {/* E-Mail */}
      <Box className={classes.boxInput}>
        <TextField
          label="E-Mail"
          className={classes.formInput}
          value={data.email}
          helperText="E-Mail ที่ใช้สำหรับเข้าระบบ"
          disabled
          size="small"
          margin="normal"
          variant="outlined"
          onChange={() => {
            alert("คุณกำลังแก้ไขโค๊ด ไม่สามารถดำเนินการได้");
          }}
        />
      </Box>
      {/* ชื่อร้านค้า */}
      <Box className={classes.boxInput}>
        <TextFields
          label="ชื่อร้านค้า"
          tag="shopName"
          className={classes.formInput}
          value={data.shopName}
          oldValue={props.oldData.shopName}
          helper="ชื่อร้านค้าความยาวไม่เกิน 100 ตัวอักษร"
          required={true}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </Box>
      <Box className={classes.boxInput} mb={2.75}>
        <TextFields
          label="เลขประจำตัวผู้เสียภาษี"
          tag="texCode"
          error={data.texCode !== props.oldData.texCode}
          className={classes.formInput}
          value={data.texCode}
          oldValue={props.oldData.texCode}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </Box>
    </Cards>
  );
}

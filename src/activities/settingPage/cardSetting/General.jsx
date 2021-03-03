import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";
import TextFields from "../../../components/Element/TextFieldCustom";
import UpPackage from "../../../components/DialogUpPackage";
import Cards from "../../../components/Element/CardCpn";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  boxInput: { marginLeft: "0%" },
  formInput: { width: "100%" },
  inputText: { color: "rgb(70,70,70)" },
  FormControl: { width: "100%" },
  button: {
    width: "18ch",
    height: "5ch",
    color: "rgb(220, 220, 220)",
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
  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);
  return (
    <Cards
      classes={classes.cardSize}
      title={"ข้อมูลเจ้าของร้าน"}
      icon={<InfoIcon />}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="รหัสร้านค้า"
            className={classes.formInput}
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
        </Grid>
        {/* package */}
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Cards>
  );
}

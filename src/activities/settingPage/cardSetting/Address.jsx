import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import InputPhone from "../../../components/InputPhone";
import TextFields from "../../../components/TextFieldCustom";
import Cards from "../../../components/CardCpn";
import BusinessIcon from "@material-ui/icons/Business";
const useStyles = makeStyles((theme) => ({
  boxFull: { marginLeft: "0%", marginRight: "0%" },
  inputFull: { width: "98%", marginLeft: "0%" },
  inputHalf: { width: "48%", marginLeft: "0%" },
}));

export default function Address(props) {
  const classes = useStyles();
  const [address, setAddress] = React.useState({
    name: "",
    tel: "",
    detail: "",
    distrust: "",
    province: "",
    city: "",
    zipCode: "",
  });

  const handleOnBlur = (value, tag) => {
    if (props.change) {
      props.handleData(value, ["general", "address", tag]);
      props.setChange(false);
    }
  };

  const handleOnChange = (value, tag) => {
    let update = { ...address };
    update[tag] = value;
    setAddress(update);
    props.setChange(true);
  };

  React.useEffect(() => {
    setAddress(props.data);
  }, [props.data]);
  return (
    <Cards title={"ข้อมูลที่อยู่ผู้จัดส่งสินค้า"} icon={<BusinessIcon />}>
      <Box className={classes.boxFull}>
        <TextFields
          label="ชื่อผู้ส่ง"
          value={address.name}
          oldValue={props.oldData.name}
          tag="name"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <InputPhone
          classes={classes.inputHalf}
          style={{ marginLeft: "2%" }}
          id="phone"
          label="เบอร์โทร"
          tag="tel"
          value={address.tel}
          oldValue={props.oldData.tel}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          helper="กรุณากรอกเบอร์โทร"
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="รายละเอียดที่อยู่"
          value={address.detail}
          oldValue={props.oldData.detail}
          tag="detail"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputFull}
          multiline
          rows={4}
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="แขวง"
          value={address.distrust}
          oldValue={props.oldData.distrust}
          tag="distrust"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <TextFields
          label="เขต"
          value={address.province}
          oldValue={props.oldData.province}
          tag="province"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
      </Box>
      <Box className={classes.boxFull}>
        <TextFields
          label="จังหวัด"
          value={address.city}
          oldValue={props.oldData.city}
          tag="city"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
        <TextFields
          label="รหัสไปรษณีย์"
          value={address.zipCode}
          oldValue={props.oldData.zipCode}
          tag="zipCode"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          className={classes.inputHalf}
        />
      </Box>
    </Cards>
  );
}

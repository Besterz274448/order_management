import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import InputPhone from "../../../components/Element/InputPhone";
import TextFields from "../../../components/Element/TextFieldCustom";
import Cards from "../../../components/Element/CardCpn";
import BusinessIcon from "@material-ui/icons/Business";
const useStyles = makeStyles((theme) => ({
  boxFull: { marginLeft: "0%", marginRight: "0%" },
  inputField: { width: "100%", marginLeft: "0%" },
}));
function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    console.log(size);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
export default function Address(props) {
  const classes = useStyles();
  const size = useWindowSize();
  const [windowSize, setWindowSize] = React.useState(0);
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
    setWindowSize(window.innerWidth);
  }, [props.data]);
  return (
    <Cards title={"ข้อมูลที่อยู่ผู้จัดส่งสินค้า"} icon={<BusinessIcon />}>
      <Grid container spacing={0}>
        <Grid container spacing={size[0] < 960 ? 0 : 2}>
          <Grid item xs={12} md={6}>
            <TextFields
              label="ชื่อผู้ส่ง"
              value={address.name}
              oldValue={props.oldData.name}
              tag="name"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputPhone
              classes={classes.inputField}
              label="เบอร์โทร"
              tag="tel"
              value={address.tel}
              oldValue={props.oldData.tel}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextFields
            label="รายละเอียดที่อยู่"
            value={address.detail}
            oldValue={props.oldData.detail}
            tag="detail"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            className={classes.inputField}
            multiline
            rows={4}
          />
        </Grid>
        <Grid container spacing={size[0] < 960 ? 0 : 2}>
          <Grid item xs={12} md={6}>
            <TextFields
              label="แขวง"
              value={address.distrust}
              oldValue={props.oldData.distrust}
              tag="distrust"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFields
              label="เขต"
              value={address.province}
              oldValue={props.oldData.province}
              tag="province"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              className={classes.inputField}
            />
          </Grid>
        </Grid>
        <Grid container spacing={size[0] < 960 ? 0 : 2}>
          <Grid item xs={12} md={6}>
            <TextFields
              label="จังหวัด"
              value={address.city}
              oldValue={props.oldData.city}
              tag="city"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFields
              label="รหัสไปรษณีย์"
              value={address.zipCode}
              oldValue={props.oldData.zipCode}
              tag="zipCode"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              className={classes.inputField}
            />
          </Grid>
        </Grid>
      </Grid>
    </Cards>
  );
}

import React from "react";
import Cards from "../../../components/Element/CardCpn";
import ContactsIcon from "@material-ui/icons/Contacts";
import Typography from "@material-ui/core/Typography";
import TextFieldS from "../../../components/Element/TextFieldCustom";
import { makeStyles } from "@material-ui/core/styles";
import InputPhone from "../../../components/Element/InputPhone";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  textField: {
    width: "100%",
  },
}));
export default (props) => {
  const handleOnBlur = (value, tag) => {
    if (props.change) {
      props.handleData(value, ["general", "contact", tag]);
    }
  };
  const handleOnChange = (value, tag) => {
    let update = { ...data };
    update[tag] = value;
    setData(update);
    props.setChange(true);
  };
  const [data, setData] = React.useState({
    tel: "",
    phone: "",
    email: "",
    website: "",
    facebook: "",
    line: "",
    IG: "",
  });
  const classes = useStyles();
  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);
  return (
    <Cards title="ข้อมูลติดต่อร้านค้า" icon={<ContactsIcon />}>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputPhone
              type="home"
              classes={classes.textField}
              label="เบอร์สำนักงาน"
              id="homePhone"
              tag="tel"
              value={data.tel}
              oldValue={props.oldData.tel}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputPhone
              classes={classes.textField}
              label="เบอร์มือถือ"
              id="telephone"
              tag="phone"
              value={data.phone}
              oldValue={props.oldData.phone}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </Grid>
        </Grid>
        <TextFieldS
          className={classes.textField}
          label="อีเมล์"
          tag="email"
          error={data.email !== props.oldData.email}
          value={data.email}
          oldValue={props.oldData.email}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <TextFieldS
          className={classes.textField}
          label="เว็บไซต์"
          tag="website"
          error={data.website !== props.oldData.website}
          value={data.website}
          oldValue={props.oldData.website}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <TextFieldS
          className={classes.textField}
          label="เฟสบุ๊ค เพจ"
          tag="facebook"
          error={data.facebook !== props.oldData.facebook}
          value={data.facebook}
          oldValue={props.oldData.facebook}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <TextFieldS
          className={classes.textField}
          label="ID ไลน์"
          tag="line"
          error={data.line !== props.oldData.line}
          value={data.line}
          oldValue={props.oldData.line}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <TextFieldS
          className={classes.textField}
          label="อินสตาแกรม"
          tag="IG"
          error={data.IG !== props.oldData.IG}
          value={data.IG}
          oldValue={props.oldData.IG}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>
    </Cards>
  );
};

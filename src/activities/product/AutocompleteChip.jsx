import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    myChip:{
        backgroundColor:"rgba(144,202,249,1)",
        color:"rgb(50,50,50)",
        padding:"10px",
        fontSize:"16px",
        fontWeight:"bold"
    }
  }));

export default function AutoCompleteChip(props) {
  const classes = useStyles();
  const [autoCompleteValue, setAutoCompleteValue] = React.useState(["foo", "bar"]);

  return (
    <Autocomplete
      multiple
      classes={{
        tag: classes.myChip
      }}
      value={props.item}
      onChange={(e, newval, reason) => {
        props.handleChangeAttribute(newval)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          style={{ margin: 8,width:"99.5%" }}
          placeholder="ชนิดข้อมูลของสินค้า"
          label="ชนิดข้อมูลของสินค้า"
          helperText={"ตัวอย่างเช่น สี ขนาด ความกว้าง ความยาว เป็นต้น"}
          InputLabelProps={{
            shrink: true,
          }}
          
          onKeyDown={(e) => {
            if (e.keyCode === 13 && e.target.value) {
              props.handleChangeAttribute(e.target.value);
            }
          }}
        />
      )}
    />
  );
}

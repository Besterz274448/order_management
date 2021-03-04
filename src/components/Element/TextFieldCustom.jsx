import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

TextField.PropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  oldValue: PropTypes.string,
  tag: PropTypes.string.isRequired,
  helper: PropTypes.string,
  required: PropTypes.bool,
};
export default function TextFieldCustom(props) {
  const {
    label = "Label",
    value = null,
    oldValue = null,
    tag,
    helper = null,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    ...other
  } = props;
  return (
    <TextField
      label={label}
      error={
        (oldValue !== null && value !== oldValue) ||
        (value !== null && value === "")
      }
      value={value}
      helperText={
        value === ""
          ? helper === null
            ? "กรุณากรอกข้อมูล"
            : helper
          : value !== oldValue
          ? "ช่องข้อมูลที่ดำเนินการแก้ไข"
          : " "
      }
      margin="normal"
      InputLabelProps={{ shrink: value !== "" }}
      variant="outlined"
      size="small"
      onChange={(e) => {
        handleOnChange(e.target.value, tag);
      }}
      onBlur={(e) => {
        handleOnBlur(e.target.value, tag);
      }}
      {...other}
    />
  );
}

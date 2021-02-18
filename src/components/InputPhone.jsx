import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import {
  FormHelperText,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@material-ui/core";
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0]/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function InputPhone(props) {
  const {
    value = "",
    oldValue,
    label = "inputLabel",
    tag,
    id,
    helper,
    classes,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    ...other
  } = props;
  return (
    <FormControl
      variant="outlined"
      className={classes}
      style={{ marginTop: "16px", marginBottom: "8px" }}
      error={value.replace(/-/g, "") !== oldValue}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        onChange={(e) => {
          handleOnChange(e.target.value, tag);
        }}
        onBlur={(e) => {
          handleOnBlur(e.target.value, tag);
        }}
        label="เบอร์โทร"
        inputComponent={TextMaskCustom}
        margin="dense"
        {...other}
      />
      <FormHelperText id={id}>
        {value === ""
          ? "กรุณากรอกเบอร์โทร"
          : value.replace(/-/g, "") !== oldValue
          ? helper === null
            ? "ข้อมูลเบอร์โทรถูกแก้ไข"
            : helper
          : " "}
      </FormHelperText>
    </FormControl>
  );
}

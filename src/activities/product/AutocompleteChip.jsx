import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function AutoCompleteChip(props) {
  return (
    <Autocomplete
      multiple
      ChipProps={{
        color: props.color,
        size: "medium",
        variant: props.variant,
      }}
      options={[]}
      freeSolo
      getOptionDisabled={(option) => true}
      value={props.item}
      onChange={(e, newval, reason) => {
        props.handleChangeAttribute(newval, props.indexKey);
      }}
      renderInput={(params) => (
        <TextField
          required={props.item.length === 0}
          {...params}
          variant="outlined"
          style={{ margin: 8, width: "100%" }}
          placeholder={props.label}
          label={props.label}
          helperText={props.helperText}
          InputLabelProps={{
            shrink: true,
          }}
          // onKeyDown={(e) => {
          //   if (e.keyCode === 13 && e.target.value) {
          //     props.handleChangeAttribute(props.item.concat(e.target.value), props.indexKey);
          //   }
          // }}
          onBlur={(e) => {
            if (e.target.value && props.item.indexOf(e.target.value) === -1) {
              props.handleChangeAttribute(props.item.concat(e.target.value), props.indexKey);
            }
          }}
        />
      )}
    />
  );
}

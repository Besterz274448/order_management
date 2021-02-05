import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({}));

export default function AutoCompleteChip(props) {
  // const [autoCompleteValue, setAutoCompleteValue] = React.useState(["foo", "bar"]);
  return (
    <Autocomplete
      multiple
      ChipProps={{
        color: props.color,
        size: "medium",
      }}
      options={[]}
      freeSolo
      getOptionDisabled={(option) => true}
      value={props.item}
      onChange={(e, newval, reason) => {
        props.handleChangeAttribute(newval, props.name);
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
          onKeyDown={(e) => {
            if (e.keyCode === 13 && e.target.value) {
              props.handleChangeAttribute(props.item.concat(e.target.value), props.name);
            }
          }}
        />
      )}
    />
  );
}

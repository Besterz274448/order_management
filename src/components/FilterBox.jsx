import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function FilterBox({ data, maxWidth,minWidth, filterSelected, handleChangeSelected , type , disabled}) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      maxWidth: maxWidth || 120,
      minWidth: minWidth || 50,
      marginRight:"5px",
    },
  }));

  const handleChange = (event)=>{
    handleChangeSelected(event.target.value);
  }

  const classes = useStyles();
  return (
    <FormControl
      size="small"
      variant="outlined"
      className={classes.formControl}
    >
      <Select
        disabled={disabled}
        onChange={handleChange}
        value={filterSelected}
        id={"filterBox" + maxWidth}
      >
        {data.map((data) => {
          return (
            <MenuItem key={data.id} value={data.id}>
              {data.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

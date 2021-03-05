import React from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import BreadCrumbs from "../../../components/BreadCrumbs";
import SearchIcon from "@material-ui/icons/Search";
import { formatDate } from "../../../utilities/date";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "10px",
  },
  textHeader: {
    fontWeight: "bold",
  },
  textSub: {
    color: "rgb(150,150,150)",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchIcon: {
    color: "rgb(150,150,150)",
  },
  info: {
    color: theme.palette.secondary.main,
    fontSize: ".9em",
  },
  infoTitle: {
    fontSize: "1em",
  },
  spacing: {
    marginLeft: "30px",
  }
}));

export default function LiveTableTitle(props) {
  const classes = useHeaderStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.root}>
      <ListItem className={classes.flexBox}>
        <BreadCrumbs
          before={[{ href: "/dashboard", name: "หน้าแรก" }]}
          presentpage="ไลฟ์สด"
        />
      </ListItem>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textHeader} variant="h6">
          ไลฟ์สด
        </Typography>
      </ListItem>
      <ListItem className={classes.flexBox}>
        <Typography className={classes.textSub}>
          รายการไลฟ์สดทั้งหมด {props.dataLength} รายการ
        </Typography>
      </ListItem>
      <ListItem>
        <FormControl size="small">
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            variant="outlined"
            value={1}
            /*open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}*/
          >
            <MenuItem value={1}>Today</MenuItem>
            <MenuItem value={2}>Ten</MenuItem>
            <MenuItem value={3}>Twenty</MenuItem>
            <MenuItem value={5}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.spacing}
            disableToolbar
            size="small"
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            id="date-picker-inline"
            label="Start Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            className={classes.spacing}
            disableToolbar
            size="small"
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            id="date-picker-inline"
            label="End Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="outlined-full-width"
          className={classes.spacing}
          placeholder="SearchBox"
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: <SearchIcon className={classes.searchIcon} />,
          }}
        />
        <div style={{ marginLeft: "auto" }}>
          <Typography variant="h6" className={classes.info}>
            Update on
          </Typography>
          <Typography variant="h6" className={classes.infoTitle}>
            {formatDate(props.date)}
          </Typography>
        </div>
      </ListItem>
    </div>
  );
}

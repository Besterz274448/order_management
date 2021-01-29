import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
  DashboardHeaderBox: {
    paddingTop: "1%",
  },
  flexBox:{
      display:"flex",
      justifyContent:"space-between"
  }
});

export default function DashboardHeader() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.DashboardHeaderBox}>
        <ListItem className={classes.flexBox}>
          <Typography variant="h5">Inventory Management Dashboard</Typography>
          <Button color="primary" variant="contained"><FilterListIcon/>Filter</Button>
        </ListItem>
        <ListItem>
          <Typography variant="h6">ยินดีต้อนรับคุณ XXX XXXX !. 👋</Typography>
        </ListItem>
      </div>
    </>
  );
}

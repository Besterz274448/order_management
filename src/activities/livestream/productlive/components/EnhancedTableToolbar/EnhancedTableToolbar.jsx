import React from "react";
import clsx from "clsx";
import { lighten } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AddExistingProduct from "./components/AddExistingProduct";


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date) => {
  const hour = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const month = monthNames[date.getMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year} ${hour}`;
};

const useToolbarDeleteStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useToolbarStatStyles = makeStyles((theme) => ({
  info: {
    color: theme.palette.secondary.main,
    fontSize: ".7em",
  },
  infoTitle: {
    fontSize: "1em",
  },
  notice_update: {
    marginRight: "10px",
  },
  title: {},
  spacer: {
    flex: "1 1 10%",
  },
  section: {
    color: "red",
    fontSize: ".7em",
  },
}));

export default function EnhancedTableToolbar(props) {
  const {
    numSelected,
    handleRemoveWhenClickIcon,
  } = props;
  const deleteClasses = useToolbarDeleteStyles();
  const stateClasses = useToolbarStatStyles();

  if (numSelected > 0) {
    return (
      <Toolbar
        className={clsx(deleteClasses.root, {
          [deleteClasses.highlight]: numSelected > 0,
        })}
      >
        <Typography
          className={deleteClasses.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleRemoveWhenClickIcon}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  } else {
    return (
      <Toolbar variant="regular">
        <Typography variant="h5" id="statistics">
          สินค้าไลฟ์
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          size="medium"
        >
          <Typography variant="h6" className={stateClasses.infoTitle}>
            ทดลอง CF
          </Typography>
        </Button>
        <AddExistingProduct />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10, marginRight: 20}}
          size="medium"
        >
          <Typography variant="h6" className={stateClasses.infoTitle}>
            พิมพ์
          </Typography>
        </Button>

        {/*<ConfirmDialog
          onActiveLiveAll={onActiveLiveAll}
          displayText="เปิดใช้งาน CF ทั้งหมด"
          color="primary"
          status={true}
        />
        <ConfirmDialog
          onActiveLiveAll={onActiveLiveAll}
          displayText="ปิดใช้งาน CF ทั้งหมด"
          color="secondary"
          status={false}
        /> 

        <div className={stateClasses.notice_update} style={{ marginLeft: 100 }}>
          <Typography variant="h6" className={stateClasses.info}>
            Update on
          </Typography>
          <Typography variant="h6" className={stateClasses.infoTitle}>
            {formatDate(date)}
          </Typography>
        </div> */}
      </Toolbar>
    );
  }
}

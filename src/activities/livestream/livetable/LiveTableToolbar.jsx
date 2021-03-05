import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(10),
  },
  title: {
    flex: "1 1 100%",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
  },
  liveButton: {
    minWidth: "100px",
    minHeight: "30px",
  },
  marginObject: {
    marginLeft: "30px",
    marginRight: "30px",
  },
}));

const LiveTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { title } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <Button
        className={classes.liveButton}
        size="small"
        color="primary"
        variant="contained"
        aria-controls="fade-menu"
        aria-haspopup="true"
      >
        สร้าง LIVE
      </Button>
    </Toolbar>
  );
};

LiveTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LiveTableToolbar;

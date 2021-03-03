import { Box, LinearProgress, withStyles } from "@material-ui/core";
import React from "react";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#2BCCC1",
  },
}))(LinearProgress);

export default (props) => {
  const { value, limit, label, ...other } = props;
  return (
    <>
      <Box display="flex" alignItems="center" mb="6px">
        <Box>{label}</Box>
        <Box ml="auto" mr={0}>
          {typeof limit === "string" ? limit : `${value}/${limit}`}
        </Box>
      </Box>
      <Box width="100%">
        <BorderLinearProgress
          value={typeof limit === "string" ? 100 : `${(value / limit) * 100}`}
          {...other}
        />
      </Box>
    </>
  );
};

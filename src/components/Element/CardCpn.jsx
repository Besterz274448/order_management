import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  CardHeader,
  Card,
  CardActions,
  Divider,
  CardContent,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default (props) => {
  const { icon, action, title, classes, children } = props;
  return (
    <Card className={classes}>
      <CardHeader avatar={icon} action={action} title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
      <CardActions disableSpacing>{action}</CardActions>
    </Card>
  );
};

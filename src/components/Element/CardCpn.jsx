import React from "react";
import {
  CardHeader,
  Card,
  CardActions,
  Divider,
  CardContent,
} from "@material-ui/core";

export default (props) => {
  const { icon, action, title, classes, children, divider = true } = props;
  return (
    <Card className={classes}>
      <CardHeader avatar={icon} action={action} title={title} />
      {divider === true ? <Divider /> : null}
      <CardContent>{children}</CardContent>
      <CardActions disableSpacing>{action}</CardActions>
    </Card>
  );
};

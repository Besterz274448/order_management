import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@material-ui/core";

export default function RecipeReviewCard(props) {
  const { icon, actionOnTop, title, children, classes } = props;

  return (
    <Card className={classes}>
      <Divider />
      <Divider />
      <CardHeader
        avatar={icon || "icon"}
        action={actionOnTop || <Button color="primary">Button</Button>}
        title={
          title ? (
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
          ) : (
            "title"
          )
        }
      />
      <Divider />
      <CardContent>{children || "information for show"}</CardContent>
    </Card>
  );
}

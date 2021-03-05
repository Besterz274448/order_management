import React from "react";
import clsx from "clsx";

import { Avatar, Card, CardContent, Grid, Typography, colors, makeStyles } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '10vh',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 50,
    width: 50,
  },
}));


const SummaryCard = (props) => {
  const classes = useStyles();
  const { text, number } = props;

  return (
    <Card className={clsx(classes.root)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item xs={9}>
            <span>{text}</span>
            <Typography color="textPrimary" variant="h6">
              {number}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Avatar className={classes.avatar} >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
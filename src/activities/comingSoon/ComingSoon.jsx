import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    paddingTop:"5%",
    margin: "0px auto",
    textAlign:"center"
  },
  image: {
    width:"200px"
  },
});

export default function ComingSoon() {
  const classes = useStyles();
  const url = window.location.pathname;
  return (
    <div className={classes.container}>
      <div className="comingsoon-image">
        <img
          className={classes.image}
          src="https://wesd.kku.ac.th/wp-content/uploads/2019/08/report.png"
          alt="coming_soon"
        />
      </div>
      <div className="comingsoon-content">
        <h3>feature{url} is Coming Soon</h3>
        <p>if you want to check in the development process. you are</p>
        <p>welcome to take a peek on Github</p>
      </div>
    </div>
  );
}

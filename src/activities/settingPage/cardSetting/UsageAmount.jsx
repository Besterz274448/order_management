import React from "react";
import Cards from "../../../components/Element/CardCpn";
import { makeStyles, Grid } from "@material-ui/core/";
import LinearLabel from "../../../components/Element/LinearLabel";

const useStyles = makeStyles({
  root: {
    width: "50%",
  },
  box: {
    width: "50%",
  },
});
export default function LinearDeterminate() {
  const classes = useStyles();
  const [usage, setUsage] = React.useState({
    order: 0,
    marketplace: 0,
    socialAccount: 0,
    website: 0,
    product: 0,
  });
  const [limit, setLimit] = React.useState({
    order: 1000,
    marketplace: 3,
    socialAccount: 3,
    website: 2,
  });
  return (
    <Cards classes={classes.root} title="การใช้งานสะสม">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LinearLabel
            label="คำสั่งซื้อ"
            limit={limit.order}
            variant="determinate"
            value={usage.order}
          />
        </Grid>
        <Grid item xs={12}>
          <LinearLabel
            label="จำนวน Market Place ที่เชื่อมต่อ"
            limit={limit.marketplace}
            variant="determinate"
            value={usage.marketplace}
          />
        </Grid>
        <Grid item xs={12}>
          <LinearLabel
            label="จำนวนโซเชียลมีเดียที่เชื่อมต่อ"
            limit={limit.socialAccount}
            variant="determinate"
            value={usage.socialAccount}
          />
        </Grid>
        <Grid item xs={12}>
          <LinearLabel
            label="จำนวนเว็บไซต์ที่เชื่อมต่อ"
            limit={limit.website}
            variant="determinate"
            value={usage.website}
          />
        </Grid>
        <Grid item xs={12}>
          <LinearLabel
            label="จำนวนสินค้า"
            limit={"ไม่จำกัด"}
            variant="determinate"
            value={usage.website}
          />
        </Grid>
      </Grid>
    </Cards>
  );
}

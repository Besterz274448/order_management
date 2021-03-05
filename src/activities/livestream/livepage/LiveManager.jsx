import React from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import SimpleTable from "./common/SimpleTable";
import SearchBox from "./common/SearchBox";
import SummaryCard from "./common/SummaryCard";
import TabsPanel from "./common/TabsPanel";

const useStyles = makeStyles({
  root: {
    marginTop: 5,
  },
});

export default function LiveManager() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4} lg={4}>
          <SummaryCard text="ลูกค้า" number={40} />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <SummaryCard text="คำสั่งซื้อ" number={40} />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <SummaryCard text="รวมเงิน" number={4000} />
        </Grid>
      </Grid>
      <Paper square className={classes.root}>
        <TabsPanel
          OrdersTable={
            <React.Fragment>
              <Grid container spacing={1}>
                <Grid xs={12} md={5} lg={4} item>
                  <SearchBox label="ชื่อลูกค้า" />
                </Grid>
                <Grid xs={12} md={7} lg={5} item>
                  <SearchBox label="สินค้า" />
                </Grid>
                <Grid xs={10} md={10} lg={2} item>
                  <TextField
                    id="outlined-number"
                    label="จำนวน"
                    type="number"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={2} md={2} lg={1} item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    สร้าง
                  </Button>
                </Grid>
                <Grid xs={12} md={12} lg={12} item>
                  <SimpleTable />
                </Grid>
              </Grid>
            </React.Fragment>
          }
        />
      </Paper>
    </Container>
  );
}

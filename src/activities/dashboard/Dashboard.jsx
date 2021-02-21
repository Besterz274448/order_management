import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";
import DataBox from "../../components/DataBox";
import DataTable from "./DataTable";
import DashboardHeader from "./DashboardHeader";
import BestSellBoard from "./BestSellBoard";
import { getDashboardData } from "../../config/dashboard.js";

class DashBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overall_data: [],
    };
  }

  componentDidMount() {
    getDashboardData((data) => {
      this.setState({
        overall_data: [...data],
      });
    });
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <DashboardHeader />
          </Grid>
        </Grid>
        <Divider></Divider>
        <Grid container style={{ padding: "3% 1%" }}>
          <Grid item xs={12} lg={3}>
            <Paper style={{ width: "95%",height:"100%" }}>
              <DataBox label={"ยอดขายวันนี้"} type="Today" total={"32"} profit={26} sinceDate={"จากสัปดาห์ก่อน"} />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Paper style={{ width: "95%",height:"100%" }}>
              <DataBox label={"ยอดขายทั้งหมด"} type="Year" total={"524"} profit={15} sinceDate={"จากสัปดาห์ก่อน"} />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Paper style={{ width: "95%",height:"100%" }}>
              <DataBox
                label={"จำนวนเงินที่ได้รับ"}
                type="Today"
                total={"$ 150364 บาท"}
                profit={15}
                sinceDate={"จากสัปดาห์ก่อน"}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Paper style={{ width: "95%",height:"100%" }}>
              <DataBox label={"จำนวนสั่งซื้อทั้งหมด"} type="Year" total={"610"} profit={-14} sinceDate={"จากสัปดาห์ก่อน"} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container style={{ padding: "0% 1%" }}>
          <Grid item xs={8}>
            <DataTable data={this.state.overall_data} />
          </Grid>
          <Grid item xs={4}>
            <BestSellBoard />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default DashBoardContainer;

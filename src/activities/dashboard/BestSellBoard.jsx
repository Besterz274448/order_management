import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  DashboardHeaderBox: {
    Height: "500px",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0% 2%",
  },
  textHeader: {
    fontWeight: "bold",
  },
  paper: {
    width: "98%",
    paddingTop: "2%",
    marginLeft: "2%",
  },
  tableHead: {
    fontWeight: "bold",
  },
  dataPercentage: {
    color: "rgba(0,200,0,0.6)",
  },
});

function createData(product_name, amount, value) {
  return { product_name, amount, value };
}

const rows = [
  createData("Frozen yoghurt", 159, 17),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

export default function BestSellBoard() {
  const classes = useStyles();
  React.useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    const data = {
      datasets: [
        {
          data: [10, 50, 20, 40, 30],
          backgroundColor: [
            "rgba(165, 42, 42, 0.9)",
            "rgba(255, 100, 100, 1)",
            "rgba(100, 100, 255, 0.8)",
            "rgba(255, 165, 0, 0.7)",
            "rgba(100, 255, 100, 0.9)",
          ],
        },
      ],
    };
    var myDoughnutChart = new window.Chart(ctx, {
      type: "doughnut",
      data: data,
    });
  }, []);

  return (
    <>
      <div className={classes.DashboardHeaderBox}>
        <Paper className={classes.paper}>
          <ListItem className={classes.flexBox}>
            <Typography className={classes.textHeader} variant="h6">
              สินค้าขายดีประจำสัปดาห์
            </Typography>
            <Typography>
              <MoreVertIcon />
            </Typography>
          </ListItem>
          <canvas id="myChart"></canvas>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>
                    ชื่อสินค้า
                  </TableCell>
                  <TableCell className={classes.tableHead} align="right">
                    จำนวน
                  </TableCell>
                  <TableCell className={classes.tableHead} align="right">
                    เพิ่มขึ้น
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.product_name}>
                    <TableCell
                      style={{ color: "rgba(50,50,50,0.8)" }}
                      component="th"
                      scope="row"
                    >
                      {row.product_name}
                    </TableCell>
                    <TableCell
                      style={{ color: "rgba(50,50,50,0.8)" }}
                      align="right"
                    >
                      {row.amount}
                    </TableCell>
                    <TableCell className={classes.dataPercentage} align="right">
                      <b>{row.value}%</b>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}

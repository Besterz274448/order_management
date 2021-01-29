import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableContainer: {
    minHeight: "500px",
  },
  tableRow: {
    color: "rgb(100,100,100)",
  },
  selectBox: {
    borderRadius: "20px",
    borderBlockColor: "none",
    color: "rgb(200,200,255)",
    backgroundColor: "rgb(100,100,255)",
    fontWeight: "bold",
    padding: "5% 10%",
    textAlign: "center",
  },
  headerData: {
    fontWeight: "bold",
    color: "rgb(70,70,70)",
    paddingBottom: "1%",
    paddingLeft: "1%",
  },
});

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root + " OrderTableRow"}>
        <TableCell
          className={classes.tableRow}
          width="15%"
          component="th"
          scope="row"
        >
          <b>{row.order_id}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="15%" align="left">
          {row.user}
        </TableCell>
        <TableCell className={classes.tableRow} width="15%" align="left">
          <b>{row.product_id}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="20%" align="right">
          <b>{row.amount}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="15%" align="center">
          <b>{row.total_amount}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="10%" align="center">
          <b>{row.date}</b>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Style = {
  tableHead: {
    color: "rgb(180,180,180)",
    fontWeight: "bold",
  },
};

export default function DataTable(props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const classes = useRowStyles();

  const headerData = [
    { name: "รหัสคำสั่งซื้อ", align: "left" },
    { name: "ผู้สั่งซื้อ", align: "left" },
    { name: "รหัสสินค้า", align: "left" },
    { name: "จำนวนที่สั่งซื้อ", align: "right" },
    { name: "ยอดชำระ", align: "right" },
    { name: "เวลา", align: "center" },
  ];

  React.useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
      <Typography variant="h6" className={classes.headerData}>
        คำสั่งซื้อล่าสุด
      </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {headerData.map((data, index) => {
                return (
                  <TableCell
                    style={Style.tableHead}
                    key={data.name + index}
                    align={data.align}
                  >
                    {data.name}
                  </TableCell>
                );
              })}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0
              ? rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => <Row key={row.order_id} row={row} />)
              : false}
            {emptyRows > 0 && (
              <TableRow style={{ height: (53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

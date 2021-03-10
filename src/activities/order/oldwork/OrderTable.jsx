import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import './OrderTable.css'

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRow: {
    color: "rgb(100,100,100)",
  },
  selectBox: {
    borderRadius: "20px",
    borderBlockColor:"none",
    color:"rgb(200,200,255)",
    backgroundColor:"rgb(100,100,255)",
    fontWeight:"bold",
    padding:"5% 10%",
    textAlign:"center",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root + " OrderTableRow"} >
        <TableCell
          className={classes.tableRow}
          width="20%"
          component="th"
          scope="row"
        >
          <b>{row.Id}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="15%" align="left">
          {row.Time}
        </TableCell>
        <TableCell className={classes.tableRow} width="20%" align="left">
          <b>{row.Customer}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="15%" align="right">
          <b>{row.Total}</b>
        </TableCell>
        <TableCell className={classes.tableRow} width="10%" align="center">
          <select onChange={(event)=>{console.log(event.target.value)}}className={classes.selectBox} 
          name="cars" id="cars">
            <option value="payment">รอการชำระเงิน</option>
            <option value="confirm">รอยืนยันการชำระเงิน</option>
            <option value="cancel">ยกเลิก</option>
          </select>
        </TableCell>
        <TableCell width="5%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow,index) => (
                    <TableRow key={historyRow.customerId}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * parseFloat(row.Total.split('$')[1]) * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
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

export default function OrderTable(props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  const headerData = [
    { name: "รหัสคำสั่งซื้อ", align: "left" },
    { name: "เวลาที่สร้าง", align: "left" },
    { name: "ชื่อผู้สั่งซื้อ", align: "left" },
    { name: "ที่ต้องชำระ", align: "right" },
    { name: "Status", align: "center" },
  ];

  React.useEffect(() => {
    setRows(props.order);
  }, [props.order]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
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
                  .map((row, index) => <Row key={row.Id} row={row} />)
              : false}
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

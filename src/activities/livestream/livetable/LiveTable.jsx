import React from "react";
import { makeStyles, TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";

import LiveTableTitle from "./LiveTableTitle";
import LiveTableToolbar from "./LiveTableToolbar";
import LiveTableHeader from "./LiveTableHeader";
import LiveTableBody from "./LiveTableBody";

function createData(
  increment,
  name,
  description,
  contact,
  lead,
  order,
  createdon,
  status
) {
  return {
    increment,
    name,
    description,
    contact,
    lead,
    order,
    createdon,
    status,
  };
}

const rows = [
  createData(
    "1",
    "โลีะเสื้อ",
    "บ้านจะไม่มีที่เก็บละ",
    10,
    150,
    20,
    Date.now(),
    "waiting"
  ),
  createData(
    "2",
    "ไลฟ์ประจำสัปดาห์",
    "หาแดกไงค่ะ",
    20,
    170,
    30,
    Date.now(),
    "offline"
  ),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function LiveTable(props) {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("caloreies");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <LiveTableTitle date={new Date()} />
      <Paper className={classes.paper}>
        <LiveTableToolbar title={"ข้อมูลรายการไลฟ์สด"} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <LiveTableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <tbody>
              <LiveTableBody
                rows={rows}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                classes={classes}
              />
            </tbody>
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
      </Paper>
    </div>
  );
}

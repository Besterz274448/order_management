import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import MoreMenu from "./IconMenu";
import { Grow } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sku",
    label: "รหัส SKU",
    align: "left",
    width: "10%",
  },
  {
    id: "name",
    label: "ชื่อสินค้า",
    width: "20%",
    align: "left",
  },
  {
    id: "price",
    label: "ราคาสินค้า",
    width: "10%",
    align: "left",
  },
  {
    id: "order",
    label: "ออเดอร์",
    width: "10%",
    align: "center",
  },
  {
    id: "sold",
    label: "ขายแล้ว",
    width: "10%",
    align: "center",
  },
  {
    id: "stock",
    label: "คงเหลือ",
    width: "10%",
    align: "center",
  },
  {
    id: "keyword",
    label: "CF Keyword",
    width: "11%",
    align: "left",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell width="2%"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
            className={classes.tableHeader}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width="15%" align="center"></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  tableHeader: {
    color: "rgb(140,140,140)",
  },
  textInput: {
    [`& input`]: {
      textAlign: "center",
      width: "60px",
    },
  },
  textInput1: {
    [`& input`]: {
      width: "80px",
    },
  },
}));

const isNumeric = ["price", "order", "sold", "stock"];

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Name");
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [oldData, setOldData] = React.useState({});

  React.useEffect(() => {
    setPage(0);
    var data = JSON.parse(JSON.stringify(props.rows));
    if (props.search_key !== "") {
      if (isNumeric.indexOf(props.filter) !== -1) {
        switch (props.operation) {
          case ">":
            data = data.filter((word) => word[props.filter] >= parseFloat(props.search_key));
            break;
          case "<":
            data = data.filter((word) => word[props.filter] <= parseFloat(props.search_key));
            break;
          case "=":
            data = data.filter((word) => word[props.filter] === parseFloat(props.search_key));
            break;
          case "[]":
            if (props.search_key2 !== "") {
              data = data.filter(
                (word) =>
                  word[props.filter] >= parseFloat(props.search_key) && word[props.filter] <= parseFloat(props.search_key2)
              );
            }
            break;
          default:
            break;
        }
      } else {
        data = data.filter((word) => word[props.filter].toUpperCase().includes(props.search_key.toUpperCase()));
      }
    }
    setRows(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rows, props.search_key, props.search_key2]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditData = (value, tag, id) => {
    let data = rows;
    let index = data.map((data) => data.id).indexOf(id);
    data[index][tag] = value;
    setRows(data);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={"medium"} aria-label="enhanced table">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell></TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <Textfield
                              defaultValue={row.sku}
                              onChange={(e) => handleEditData(e.target.value, "sku", row.id)}
                              size="small"
                            />
                          </Grow>
                        ) : (
                          row.sku
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <Textfield
                              defaultValue={row.name}
                              onChange={(e) => handleEditData(e.target.value, "name", row.id)}
                              size="small"
                            />
                          </Grow>
                        ) : (
                          <Tooltip title={row.name}>
                            <Typography>{row.name.length > 25 ? row.name.slice(0, 25) + "..." : row.name}</Typography>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <Textfield
                              onChange={(e) => handleEditData(e.target.value, "price", row.id)}
                              className={classes.textInput1}
                              type="number"
                              defaultValue={row.price}
                              size="small"
                            />
                          </Grow>
                        ) : (
                          row.price
                        )}
                      </TableCell>
                      <TableCell align="center">{row.order}</TableCell>
                      <TableCell align="center">{row.sold}</TableCell>
                      <TableCell align="center">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <Textfield
                              onChange={(e) => handleEditData(e.target.value, "stock", row.id)}
                              className={classes.textInput}
                              type="number"
                              defaultValue={row.stock}
                              size="small"
                            />
                          </Grow>
                        ) : (
                          row.stock
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <Textfield
                              onChange={(e) => handleEditData(e.target.value, "keyword", row.id)}
                              className={classes.textInput1}
                              defaultValue={row.keyword}
                              size="small"
                            />
                          </Grow>
                        ) : (
                          row.keyword
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {selected === row.id ? (
                          <Grow in={selected === row.id}>
                            <ListItem>
                              <Button
                                onClick={() => {
                                  //รอเพิ่มเคสกรณี data ส่งไปไม่ถึงฝัน
                                  let index = rows.map((data) => data.id).indexOf(row.id);
                                  setSelected("");
                                  props.confirmEditData(index, rows[index]);
                                }}
                                style={{ marginLeft: "auto", marginRight: "auto" }}
                                variant="outlined"
                                color="primary">
                                ยืนยัน
                              </Button>
                              <Button
                                style={{ marginLeft: "auto", marginRight: "auto" }}
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                  let oldrow = JSON.parse(JSON.stringify(rows));
                                  const index = oldrow.findIndex(data => data.id === selected);
                                  oldrow[index] = oldData;
                                  console.log(oldrow[index]);
                                  setRows(oldrow);
                                  setSelected("");
                                }}>
                                ยกเลิก
                              </Button>
                            </ListItem>
                          </Grow>
                        ) : (
                          <MoreMenu
                            handleEdit={() => {
                              const temp = JSON.parse(JSON.stringify(rows.filter(data => data.id === row.id)[0]));
                              setOldData(temp);
                              setSelected(row.id);
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
      </Paper>
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Product } from "../Data/MockData";
import EnhancedTableHead from "./components/EnhancedTableHead/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableBody from "./components/EnhancedTableBody/EnhancedTableBody";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "hide",
  },
  container: {
    maxHeight: 460,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
}));

export default function ProductLive() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, _] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState(new Product().liveProduct);

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const updateOneProduct = (event, row) => {
    const newArr = [...products];
    const index = newArr.map((x) => x.id).indexOf(row.id);
    newArr[index] = row;
    setProducts(newArr);
  };

  const handleRemoveProduct = (event, productId) => {
    const newArr = products.filter((x) => x.id !== productId);
    setProducts(newArr);
  };

  const handleRemoveWhenClickIcon = () => {
    const newArr = products.filter((x) => !selected.includes(x.id));
    setProducts(newArr);
    setSelected([]);
  };

  const handleEditProduct = (event, product) => {
    const newArr = [...products];
    const index = newArr.map((x) => x.id).indexOf(product.id);

    Object.keys(product).forEach((x) => {
      newArr[index][x] = product[x];
    });

    setProducts(newArr);
  };

  const handleActiveLiveAll = (event, status) => {
    setProducts(products.map((x) => ({ ...x, live: status })));
  };



  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        date={new Date()}
        onActiveLiveAll={handleActiveLiveAll}
        handleRemoveWhenClickIcon={handleRemoveWhenClickIcon}
      />
      <TableContainer table className={classes.container} >
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
          table-layout="fixed"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={products.length}
            classes={classes}
          />
          <tbody>
            <EnhancedTableBody
              rows={products}
              handleClick={handleClick}
              isSelected={isSelected}
              updateOneProduct={updateOneProduct}
              handleEditProduct={handleEditProduct}
              handleRemoveProduct={handleRemoveProduct}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              classes={classes}
            />
          </tbody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.stickyFooter}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useToolbarStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 2,
  },
}));

const headCells = [
  {
    id: "live",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "ใช้งาน CF",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "รหัสสินค้า",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "ชื่อสินค้า",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "ประเภท",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "ราคา",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "คงเหลือ",
  },
  {
    id: "cf",
    numeric: false,
    disablePadding: true,
    sort: true,
    label: "จำนวน CF",
  },
  {
    id: "keyword",
    numeric: false,
    disablePadding: false,
    sort: true,
    label: "Keyword",
  },
  {
    id: "buttonEdit",
    numeric: false,
    disablePadding: true,
    sort: false,
    label: "",
  },
  {
    id: "buttonDelete",
    numeric: false,
    disablePadding: true,
    sort: false,
    label: "",
  },
];

export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    classes,
  } = props;

  const toolbarClass = useToolbarStyles();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.tableCell}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableCell}
          >
            {headCell.sort && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={toolbarClass.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const headCells = [
  {
    id: "increment",
    numeric: false,
    disablePadding: false,
    label: "#",
  },
  { id: "name", numeric: false, disablePadding: false, label: "ชื่อ" },
  { id: "description", numeric: false, disablePadding: false, label: "รายละเอียด" },
  { id: "contact", numeric: true, disablePadding: false, label: "ลูกค้าใหม่" },
  { id: "lead", numeric: true, disablePadding: false, label: "ผู้สนใจ" },
  { id: "order", numeric: true, disablePadding: false, label: "ออเดอร์"},
  { id: "createdon", numeric: true, disablePadding: false, label: "วันที่ Live"}, 
  { id: "status", numeric: false, disablePadding: false, label: "สถานะ"},
  { id: "action", numeric: false, disablePadding: false, label: "จัดการข้อมูล"}
];

function LiveTableHeader(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

LiveTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default LiveTableHeader;
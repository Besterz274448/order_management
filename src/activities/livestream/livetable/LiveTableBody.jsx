import { NavLink } from "react-router-dom";
import TableRow from "@material-ui/core/TableROw";
import TableCell from "@material-ui/core/TableCell";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { getComparator, stableSort } from "../../../utilities/tableUtils";

export default function LiveTableBody(props) {
  const { rows, order, orderBy, page, rowsPerPage, emptyRows } = props;

  return (
    <>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
              <TableCell id={labelId} align="left">
                {row.increment}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right">{row.contact}</TableCell>
              <TableCell align="right">{row.lead}</TableCell>
              <TableCell align="right">{row.order}</TableCell>
              <TableCell align="right">{row.createdon}</TableCell>
              <TableCell align="left">
                <Chip
                  label={row.status}
                  clickable
                  color={row.status === "offline" ? "" : "primary"}
                />
              </TableCell>
              <TableCell align="left">
                <NavLink to="/livestream/product">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    to="/"
                  >
                    จัดการ
                  </Button>
                </NavLink>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 10 }}
                >
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 33 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );
}

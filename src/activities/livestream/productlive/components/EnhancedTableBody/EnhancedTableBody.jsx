import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
//import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import { getComparator, stableSort } from "../../../../../utilities/tableUtils";
import EditDialog from "./components/EditDialog";
import DeleteDialog from "./components/DeleteDialog";

export default function EnhancedTableBody(props) {
  const {
    rows,
    handleClick,
    isSelected,
    updateOneProduct,
    handleEditProduct,
    handleRemoveProduct,
    order,
    orderBy,
    page,
    rowsPerPage,
    classes,
  } = props;

  return (
    <>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell
                padding="checkbox"
                onClick={(event) => handleClick(event, row.id)}
                className={classes.TableCell}
              >
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              <TableCell
                padding="none"
                align="left"
                style={{ width: "100px" }}
                className={classes.TableCell}
              >
                <Switch
                  checked={row.live}
                  onChange={(event) => {
                    updateOneProduct(event, row);
                    row.live = !row.live;
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                className={classes.TableCell}
              >
                {row.id}
              </TableCell>
              <TableCell align="left" className={classes.TableCell}>
                {row.name}
              </TableCell>
              <TableCell align="left" className={classes.TableCell}>
                {row.category}
              </TableCell>
              <TableCell align="left" className={classes.TableCell}>
                {row.price}
              </TableCell>
              <TableCell align="left" className={classes.TableCell}>
                {row.quantity}
              </TableCell>
              <TableCell align="left" className={classes.TableCell}>
                {row.cf}
              </TableCell>
              <TableCell
                padding="none"
                align="left"
                className={classes.TableCell}
              >
             {/*    {row.keyword.map((keyword) => (
                  <Chip
                    key={keyword}
                    size="small"
                    variant="outlined"
                    color="primary"
                    label={keyword}
                    className={classes.chip}
                  />
                ))} */}
              </TableCell>
              <TableCell
                align="center"
                padding="none"
                className={classes.TableCell}
              >
                <EditDialog onEditProduct={handleEditProduct} row={row} />
              </TableCell>
              <TableCell
                align="left"
                padding="none"
                className={classes.TableCell}
              >
                <DeleteDialog
                  onRemoveProduct={handleRemoveProduct}
                  productId={row.id}
                />
              </TableCell>
            </TableRow>
          );
        })}
    </>
  );
}

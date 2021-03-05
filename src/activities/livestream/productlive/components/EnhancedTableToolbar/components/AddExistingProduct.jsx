import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExistingProductTable from "./ExistingProductTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function AddExistingProduct() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleClickOpen}
      >
        + เพิ่มสินค้า
      </Button>
      <Dialog
      maxWidth='lg'
        className={classes.container}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          เพิ่มสินค้าสำหรับไลฟ์สด
        </DialogTitle>
        <DialogContent>
          <ExistingProductTable />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            size="small"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="small"
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

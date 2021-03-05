import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { onRemoveProduct, productId } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveProduct = (event, productId) => {
    onRemoveProduct(event, productId);
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        ลบ
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ลบสินค้า</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ยืนยันการลบสินค้าจากหน้าไลฟ์
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button
            onClick={(event) => handleRemoveProduct(event, productId)}
            color="secondary"
            autoFocus
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

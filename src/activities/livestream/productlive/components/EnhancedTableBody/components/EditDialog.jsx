import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MuiDialogActions from "@material-ui/core/DialogActions";
//import ChipInput from "material-ui-chip-input";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialog(props) {
  const { row, onEditProduct } = props;
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(row);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSave = (event) => {
    const updateProduct = {
      id: product.id,
      keyword: product.keyword,
      price: product.price,
      quantity: product.quantity,
    };

    onEditProduct(event, updateProduct);
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setProduct({
      ...product,
      [prop]: event.target.value ? parseInt(event.target.value) : 0,
    });
  };

  const handleAddChip = (chip) => {
    let p = Object.assign({}, product);
    p.keyword.push(chip);
    setProduct(p);
  };

  const handleRemoveChip = (index) => {
    let p = Object.assign({}, product);
    p.keyword.splice(index, 1);
    setProduct(p);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        แก้ไข
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id={product.id} onClose={handleClose}>
          <Typography variant="h6">แก้ไข {product.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <ChipInput
                  classes={{ root: { color: "primary" } }}
                  label="Keyword"
                  allowDuplicates={false}
                  value={product.keyword}
                  newChipKeyCodes={[9, 32]}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(_, index) => handleRemoveChip(index)}
                  fullWidth
                  fullWidthInput
                  variant="outlined"
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="price"
                  label="ราคา"
                  type="number"
                  value={product.price}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onChange={handleChange("price")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="quantity"
                  label="จำนวน"
                  type="number"
                  value={product.quantity}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onChange={handleChange("quantity")}
                />
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClickSave}
            color="primary"
            variant="contained"
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

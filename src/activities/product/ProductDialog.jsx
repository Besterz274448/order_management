import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AutoCompleteChip from "./AutocompleteChip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Divider, Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ImageComponent from "./ImageComponent";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  headerMain: {
    margin: 0,
    padding: 0,
  },
  inputForm: {
    width: "96.5%",
  },
  inputText: {
    color: "rgb(70,70,70)",
  },
  boxInput: {
    width: "100%",
  },
  boxInputInline: {
    width: "98.5%",
    display: "flex",
    justifyContent: "space-between",
  },
  inputInline: {
    width: "25%",
  },
  uploadBox: {
    display: "none",
  },
  imageTag: {
    marginLeft: "1%",
    display: "flex",
    justifyContent: "center",
    width: "97%",
    overflowX: "auto",
    overflowY: "none",
    border: "3px dotted rgb(200,200,200)",
    minHeight: "100px",
  },
}));

export default function ProductDialog(props) {
  const classes = useStyles();
  const defaultInputProp = {
    size: "small",
    margin: "normal",
    variant: "outlined",
    required: true,
    InputLabelProps: {
      shrink: true,
    },
    InputProps: {
      className: classes.inputText,
    },
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md">
        <DialogTitle id="alert-dialog-title">
          <h3>เพิ่มสินค้า</h3>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div style={{ padding: "1% 0%" }}>
            <h4 style={{ marginLeft: "1%", paddingBottom: "1%" }}>ข้อมูลทั่วไป</h4>
            <Grid container>
              <Grid item xs={7}>
                <div className={classes.boxInputInline}>
                  <TextField
                    label="ชื่อสินค้า"
                    style={{ margin: 8, width: "60%" }}
                    placeholder="ชื่อสินค้า"
                    {...defaultInputProp}
                  />
                  <TextField
                    className={classes.inputInline}
                    label="ค่าจัดส่งสินค้า"
                    style={{ margin: 8 }}
                    placeholder="ค่าจัดส่ง"
                    type="number"
                    {...defaultInputProp}
                  />
                  <TextField
                    className={classes.inputInline}
                    type="number"
                    label="น้ำหนักสินค้า"
                    placeholder="น้ำหนัก"
                    style={{ margin: 8 }}
                    {...defaultInputProp}
                  />
                </div>
                <div style={{ width: "96.5%" }}>
                  <AutoCompleteChip handleChangeAttribute={props.handleChangeAttribute} item={props.new_product.attribute} />
                </div>

                <div className={classes.imageTag}>
                  {props.image.map((data, index) => {
                    return <ImageComponent image={data} key={data + index} />;
                  })}
                  <input
                    accept="image/*"
                    className={classes.uploadBox}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={props.handleUploadClick}
                  />
                  <label htmlFor="contained-button-file" style={{ width: "80px" }}>
                    <p style={{ textAlign: "center", color: "rgb(150,150,150)", fontWeight: "bold" }}>เพิ่มรูปภาพ</p>
                    <img
                      width="100%"
                      src="https://www.devlog.in.th/wp-content/uploads/2018/06/cloud-2044823_960_720.png"
                      alt="imageUpload"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.boxInput}>
                  <TextField
                    className={classes.inputForm}
                    style={{ margin: 8 }}
                    label="รายละเอียดสินค้า"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    rows={11}
                    variant="outlined"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <Divider />
            <h4 style={{ marginLeft: "1%", paddingBottom: "1%" }}>ข้อมูลจำเพาะของสินค้า</h4>

            {/* <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableCell>SKU</TableCell>
                  <TableCell>ชื่อสินค้า</TableCell>
                  {props.new_product.attribute.map((data,index)=>{
                    return <TableCell key={data}>{data}</TableCell>
                  })}
                  <TableCell>ราคา</TableCell>
                  <TableCell>จำนวน</TableCell>
                  <TableCell>Keyword</TableCell>
                </TableHead>
              </Table>
            </TableContainer> */}
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" onClick={props.handleClickClose} color="primary">
            บันทึกข้อมูล
          </Button>
          <Button variant="contained" onClick={props.handleClickClose} color="secondary" autoFocus>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

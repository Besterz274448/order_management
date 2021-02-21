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
import { Divider, Grid, FormControlLabel, Switch, hidden } from "@material-ui/core";
import ImageComponent from "./ImageComponent";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  headerMain: {
    margin: 0,
    padding: 0,
  },
  inputForm: {
    width: "96%",
  },
  inputText: {
    color: "rgb(70,70,70)",
  },
  boxInput: {
    display: "flex",
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
    marginTop: "2%",
    paddingTop: "6%",
    paddingBottom: "3.2%",
    textAlign: "center",
    width: "100%",
    whiteSpace: "nowrap",
    overflowX: "auto",
    border: "3px dotted rgb(200,200,200)",
    minHeight: "100px",
  },
  theadRow: {
    fontWeight: "bold",
    backgroundColor: "rgba(242,243,247,1)",
  },
  theadCell: {
    fontWeight: "bold",
    color: "rgb(100,100,100)",
    borderRight: "1px solid rgba(242,243,247,1)",
    borderleft: "1px solid rgba(242,243,247,1)",
    padding: 5,
    textAlign: "center",
  },
  tbodyCell: {
    borderRight: "1px solid rgba(242,243,247,1)",
    borderleft: "1px solid rgba(242,243,247,1)",
  },
  textInput: {
    [`& fieldset`]: {
      borderRadius: "20px",
    },
    [`& input`]: {
      textAlign: "center",
    },
  },
  dialogTitle: {
    paddingLeft: "9px",
  },
}));

export default function ProductDialog(props) {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    delivery_price: 0,
    weight: 0,
    description: "",
  });

  const [newSubProduct, setNewSubProduct] = React.useState([]);

  React.useEffect(() => {
    setNewProduct({
      name: props.newProduct.name,
      delivery_price: props.newProduct.delivery_price,
      weight: props.newProduct.weight,
      description: props.newProduct.description,
    });
    setNewSubProduct(props.sub_product);
  }, [props.newProduct, props.sub_product]);

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
        onClose={() => {
          props.handleClickClose(props.headName.label);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg">
        <DialogTitle id="simple-dialog-title">{props.headName.id}</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: 0 }}>
          <form id="add_product_form" onSubmit={props.handleProduct}>
            <div style={{ paddingLeft: "3%", paddingRight: "3%", paddingTop: "3%", paddingBottom: "1%" }}>
              <h4 style={{ marginLeft: "1%", paddingBottom: "1%" }}>ข้อมูลทั่วไป</h4>
              <Grid container>
                <Grid item xs={7}>
                  <div className={classes.boxInputInline}>
                    <TextField
                      label="ชื่อสินค้า"
                      style={{ margin: 8, width: "60%" }}
                      placeholder="ชื่อสินค้า"
                      {...defaultInputProp}
                      helperText="สำหรับตั้งชื่อสินค้าหลัก หรือ ตั้งชื่อกลุ่มของสินค้า"
                      defaultValue={newProduct.name}
                      onChange={(event) => {
                        let item = newProduct;
                        item.name = event.target.value;
                        setNewProduct(item);
                      }}
                      onBlur={(event) => {
                        props.handleNewProduct(event.target.value, "name", props.type.product);
                      }}
                    />
                    <TextField
                      className={classes.inputInline}
                      label="ค่าจัดส่งสินค้า"
                      style={{ margin: 8 }}
                      placeholder="ค่าจัดส่ง"
                      type="number"
                      {...defaultInputProp}
                      defaultValue={newProduct.delivery_price}
                      onChange={(event) => {
                        let item = newProduct;
                        item.delivery_price = event.target.value;
                        setNewProduct(item);
                      }}
                      onBlur={(event) => {
                        props.handleNewProduct(event.target.value, "delivery_price", props.type.product);
                      }}
                    />
                    <TextField
                      className={classes.inputInline}
                      type="number"
                      label="น้ำหนักสินค้า"
                      placeholder="น้ำหนัก"
                      style={{ margin: 8 }}
                      {...defaultInputProp}
                      defaultValue={newProduct.weight}
                      onChange={(event) => {
                        let item = newProduct;
                        item.weight = event.target.value;
                        setNewProduct(item);
                      }}
                      onBlur={(event) => {
                        props.handleNewProduct(event.target.value, "weight", props.type.product);
                      }}
                    />
                  </div>
                  <div className={classes.boxInput} style={{ marginLeft: "9px" }}>
                    <TextField
                      className={classes.inputForm}
                      label="รายละเอียดสินค้า"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      multiline
                      rows={4}
                      variant="outlined"
                      defaultValue={newProduct.description}
                      onChange={(event) => {
                        let item = newProduct;
                        item.description = event.target.value;
                        setNewProduct(item);
                      }}
                      onBlur={(event) => {
                        props.handleNewProduct(event.target.value, "description", props.type.product);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={5}>
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
                      onChange={(e) => {
                        props.handleUploadClick(e, props.type.image);
                      }}
                    />
                    <label  style={{ width: "80px", height: "100px", display: "inline-block" }}>
                      <p  style={{ textAlign: "center", color: "rgb(150,150,150)", fontWeight: "bold" }}>เพิ่มรูปภาพ</p>
                      <img
                        width="80px"
                        src="https://www.devlog.in.th/wp-content/uploads/2018/06/cloud-2044823_960_720.png"
                        alt="imageUpload"
                      />
                    </label>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div style={{ padding: "0% 3%" }}>
              <h4 style={{ marginLeft: "1%", paddingBottom: "1%" }}>Variants</h4>
              <div style={{ width: "98%" }}>
                <AutoCompleteChip
                  handleChangeAttribute={props.handleChangeAttribute}
                  dataType={props.type}
                  item={props.variants.map((data) => data.name)}
                  label="ประเภทข้อมูล"
                  helperText="ตัวอย่างเช่น สี ขนาด ความกว้าง ความยาว เป็นต้น"
                  color="primary"
                />
                {props.variants.map((data, index) => {
                  return (
                    <AutoCompleteChip
                      key={data.name + index}
                      handleChangeAttribute={props.handleChangeAttributeValue}
                      dataType={props.type}
                      item={data.value}
                      label={"ค่าของ" + data.name}
                      name={data.name}
                      color="secondary"
                    />
                  );
                })}
              </div>
            </div>
            <div style={{ padding: "1% 4%" }}>
              <h4 style={{ paddingBottom: "1%" }}>ข้อมูลจำเพาะของสินค้า</h4>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow hover className={classes.theadRow}>
                      <TableCell className={classes.theadCell}>SKU</TableCell>
                      <TableCell className={classes.theadCell}>ชื่อสินค้า</TableCell>
                      <TableCell className={classes.theadCell}>ราคา</TableCell>
                      <TableCell className={classes.theadCell}>จำนวน</TableCell>
                      <TableCell className={classes.theadCell}>Keyword</TableCell>
                      {props.variants.map((data, index) => {
                        return (
                          <TableCell key={data.name} width="7%" className={classes.theadCell}>
                            {data.name}
                          </TableCell>
                        );
                      })}
                      <TableCell width="5%" className={classes.theadCell}>
                        ซิงค์ข้อมูล
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newSubProduct.map((data, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className={classes.theadCell} width="15%">
                            <TextField
                              required
                              size="small"
                              variant="outlined"
                              defaultValue={data.sku}
                              margin="none"
                              className={classes.textInput}
                              onBlur={(event) => {
                                props.handleNewSubProduct(event.target.value, "sku", index, props.type.sub);
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.theadCell} width="15%">
                            <TextField
                              required
                              size="small"
                              variant="outlined"
                              defaultValue={data.name}
                              margin="none"
                              className={classes.textInput}
                              onBlur={(event) => {
                                props.handleNewSubProduct(event.target.value, "name", index, props.type.sub);
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.theadCell} width="10%">
                            <TextField
                              type="number"
                              required
                              size="small"
                              variant="outlined"
                              defaultValue={data.price}
                              margin="none"
                              className={classes.textInput}
                              onBlur={(event) => {
                                props.handleNewSubProduct(event.target.value, "price", index, props.type.sub);
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.theadCell} width="10%">
                            <TextField
                              required
                              type="number"
                              size="small"
                              variant="outlined"
                              defaultValue={data.stock}
                              margin="none"
                              className={classes.textInput}
                              onBlur={(event) => {
                                props.handleNewSubProduct(event.target.value, "stock", index, props.type.sub);
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.theadCell} width="10%">
                            <TextField
                              required
                              size="small"
                              variant="outlined"
                              defaultValue={data.keyword}
                              margin="none"
                              className={classes.textInput}
                              onBlur={(event) => {
                                props.handleNewSubProduct(event.target.value, "keyword", index, props.type.sub);
                              }}
                            />
                          </TableCell>
                          {props.variants.map((key, index) => {
                            return (
                              <TableCell className={classes.theadCell} key={key + index}>
                                <Chip variant="outlined" color="primary" label={data.attribute[key.name]} />
                              </TableCell>
                            );
                          })}
                          <TableCell align="center">
                            <FormControlLabel control={<Switch color="primary" />} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button form="add_product_form" type="submit" variant="contained" color="primary">
            บันทึกข้อมูล
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.handleClickClose(props.headName.label);
            }}
            color="secondary"
            autoFocus>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

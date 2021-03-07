import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import Dialog from "./Dialog";
import AutocompleteChip from "./AutocompleteChip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import shortid from "shortid";
import { getProductById } from "../../config/product";

const useStyles = makeStyles({
  flexbox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5%",
  },
  product_detail: {
    width: "100%",
    backgroundColor: "white",
    padding: "1% 1.5% 1.5% 1.5%",
    // boxShadow: "5px 5px 20px rgb(233,233,233)",
    // borderRadius: "10px",
  },
  product_image: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: "1% 1.5% 3% 1.5%",
  },
  textGroup: {
    size: "18px",
    fontWeight: "bold",
  },
  productadd_header: {
    display: "flex",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "88%",
    margin: "auto auto",
    paddingTop: "9px",
    height: "150px",
    border: "2px dashed rgb(200,200,200)",
    // backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='https://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },
  imageContent: {
    textAlign: "center",
  },
  table_box: {
    padding: "0% 1.5% 3% 1.5%",
    width: "100%",
    backgroundColor: "white",
    marginTop: "1.5%",
  },
  input_table: {
    height: "7px",
  },
  subProductBar: {
    marginBottom: "15px",
  },
});

export default function EditProduct() {
  const classes = useStyles();
  const [data, setData] = React.useState({
    id: "",
    name: "",
    weight: undefined,
    description: "",
    delivery_price: undefined,
    width: undefined,
    height: undefined,
    length: undefined,
    attribute: [],
    image: [],
    salechannnel: [],
    subproduct: [
      {
        ID: "",
        product_id: "",
        sku: "",
        name: "",
        price: "",
        stock: "",
        keyword: "",
        attribute: {},
        sold: "",
        order: "",
      },
    ],
    createdon: "",
    modifiedon: "",
    modifiedby: "",
  });

  React.useEffect(() => {
    const path = window.location.pathname.split("/");
    getProductById(path[3], (data) => {
      let newData = JSON.parse(JSON.stringify(data.product));
      
      //แก้ขัด รอแก้งานหลัก
      if(typeof data.product.image !== typeof []){
        let item = {src: data.product.image,name:"image01"};
        newData.image = [item];
      }
      newData.subproduct = [...data.variant];
      if(newData.attribute === null){
        newData.attribute = [];
      }
      setData(newData);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [dialogState, setDialogState] = React.useState("none");
  const [tabSelected, setTabSelected] = React.useState(0);

  const defaultInputProp = {
    size: "small",
    variant: "outlined",
    required: true,
    InputLabelProps: {
      shrink: true,
    },
    InputProps: {
      className: classes.inputText,
    },
  };

  const handleChangeTabs = (event, newValue) => {
    let newData = data;
    if (newValue === 0) {
      data.subproduct = [
        {
          product_id: "",
          sku: "",
          name: "",
          price: 0,
          stock: 0,
          keyword: "",
          order: 0,
          sold: 0,
          attribute: {},
        },
      ];
    } else {
      data.subproduct = [];
    }
    data.attribute = [];
    setData(newData);
    setTabSelected(newValue);
  };
  const handleDialog = (value) => {
    setOpen(value);
  };

  const handleData = (value, tag) => {
    setData({ ...data, [tag]: value });
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      // eslint-disable-next-line no-useless-computed-key
      await setData({ ...data, ["image"]: [...data.image, { name: event.target.files[0].name, src: reader.result }] });
      event.target.value = "";
    };
  };

  const handleChangeAttribute = (value, key) => {
    let newAttr = [];
    let oldName = [];
    if (value.length > 0) {
      if (value.length > 2) {
        setDialogState("max");
        return;
      }
      setDialogState("changed");
    } else {
      setDialogState("none");
    }
    if (data.attribute.length > 0) {
      oldName = data.attribute.map((data) => data.name);
    }
    for (let i = 0; i < value.length; i++) {
      if (oldName.indexOf(value[i]) === -1) {
        newAttr[i] = { name: value[i], value: [] };
      } else {
        newAttr[i] = data.attribute[oldName.indexOf(value[i])];
      }
    }
    setData({ ...data, [key]: newAttr });
  };

  const handleChangeAttributeValue = (value, key) => {
    let newAttr = data.attribute;
    let newValue = [];
    for (let i = 0; i < value.length; i++) {
      newValue[i] = value[i];
    }
    const index = newAttr.findIndex((data) => data.name === key);
    newAttr[index].value = newValue;
    // eslint-disable-next-line no-useless-computed-key
    setData({ ...data, ["attribute"]: newAttr });
  };

  const addNewSubProduct = () => {
    let newSubProdut = data.subproduct;
    newSubProdut.push({
      product_id: "",
      sku: "",
      name: "",
      price: 0,
      stock: 0,
      keyword: "",
      order: 0,
      sold: 0,
      attribute: {},
    });
    setData({ ...data, newSubProdut });
  };

  const cartesianProduct = (item) => {
    const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
    const attr = item.map((data) => data.name);
    const value = item.map((data) => data.value);

    console.log(attr);
    console.log(value);
    if (attr.length > 0) {
      let newData = [];
      if (attr.length === 1) {
        for (let i = 0; i < value[0].length; i++) {
          let item = {};
          item[attr[0]] = value[i];
          newData.push({
            product_id: "",
            sku: "",
            name: "",
            price: 0,
            stock: 0,
            keyword: "",
            order: 0,
            sold: 0,
            attribute: item,
          });
        }
        return newData;
      }
      let cartesianData = cartesian(...value);
      for (let i = 0; i < cartesianData.length; i++) {
        let item = {};
        for (let j = 0; j < attr.length; j++) {
          item[attr[j]] = cartesianData[i][j];
        }
        newData.push({ product_id: "", sku: "", name: "", attribute: item, price: 0, stock: 0, order: 0, sold: 0, keyword: "" });
      }
      return newData;
    }
  };

  const saveSubProductAttr = () => {
    let error = false;
    for (let i = 0; i < data.attribute.length; i++) {
      if (data.attribute[i].value.length === 0) {
        error = true;
        break;
      }
    }
    if (error) {
      setDialogState("error");
      return;
    }

    let newData = data;
    newData.subproduct = cartesianProduct(data.attribute);
    setData(newData);
    setDialogState("none");
    setOpen(false);
    console.log(newData);
  };

  const onDeleteItem = (key, index) => {
    let newData = JSON.parse(JSON.stringify(data[key]));
    newData.splice(index, 1);
    // eslint-disable-next-line no-useless-computed-key
    setData({ ...data, [key]: [...newData] });
  };

  const onChangeSubProduct = (value, index, key) => {
    let newData = JSON.parse(JSON.stringify(data.subproduct));
    newData[index][key] = value;
    // eslint-disable-next-line no-useless-computed-key
    setData({ ...data, ["subproduct"]: [...newData] });
  };

  const createProductData = (e) => {
    e.preventDefault();
    if (data.subproduct.length < 1) {
      alert("ต้องมีข้อมูลสินค้าย่อยอย่างน้อย 1 ชิ้น");
      return;
    }

    alert("pass");
  };

  return (
    <form id="add_product_form" onSubmit={createProductData}>
      {/* <Hidden mdDown> */}
      <div style={{ paddingTop: "1%", paddingLeft: "0.5%", paddingRight: "0.5%" }}>
        <div className={classes.productadd_header}>
          <BreadCrumbs
            before={[
              { href: "/dashboard", name: "หน้าแรก" },
              { href: "/product", name: "รายการสินค้า" },
            ]}
            presentpage="แก้ไขข้อมูลสินค้า"
          />
          <div style={{ marginRight: "1%" }}>
            <Button variant="contained" color="primary" form="add_product_form" type="submit">
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "1%" }}>
          <Grid container spacing={3}>
            <Grid item sm={12} lg={8}>
              <Paper elevation={2} className={classes.product_detail}>
                {/* <div className={classes.product_detail}> */}
                <Typography color="initial" className={classes.textGroup}>
                  ข้อมูลทั่วไป
                </Typography>
                <div style={{ paddingTop: "1.5%", paddingBottom: "1.5%" }}>
                  <TextField
                    type="text"
                    label="ชื่อสินค้า"
                    placeholder="ตั้งชื่อสินค้าหลัก หรือ ชื่อกลุ่มของสินค้าที่นี่"
                    fullWidth
                    value={data.name}
                    onChange={(e) => {
                      handleData(e.target.value, "name");
                    }}
                    variant="outlined"
                    {...defaultInputProp}
                  />
                </div>
                <div style={{ paddingTop: "1.5%", paddingBottom: "1.5%", display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "49%" }}>
                    <TextField
                      type="number"
                      label="ราคาส่งสินค้า"
                      placeholder="ราคาส่งของสินค้า"
                      fullWidth
                      variant="outlined"
                      {...defaultInputProp}
                      value={data.delivery_price}
                      onChange={(e) => {
                        handleData(e.target.value, "delivery_price");
                      }}
                    />
                  </div>
                  <div style={{ width: "49%" }}>
                    <TextField
                      type="number"
                      label="น้ำหนักสินค้า"
                      placeholder="น้ำหนักของสินค้า"
                      fullWidth
                      variant="outlined"
                      {...defaultInputProp}
                      value={data.weight}
                      onChange={(e) => {
                        handleData(e.target.value, "weight");
                      }}
                    />
                  </div>
                </div>
                <div style={{ paddingTop: "1.5%", paddingBottom: "1.5%", display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "32%" }}>
                    <TextField
                      type="number"
                      label="ความกว้าง"
                      placeholder="ความกว้างของสินค้า"
                      fullWidth
                      variant="outlined"
                      {...defaultInputProp}
                      value={data.width}
                      onChange={(e) => {
                        handleData(e.target.value, "width");
                      }}
                    />
                  </div>
                  <div style={{ width: "32%" }}>
                    <TextField
                      type="number"
                      label="ความยาว"
                      placeholder="ความยาวของสินค้า"
                      fullWidth
                      variant="outlined"
                      {...defaultInputProp}
                      value={data.length}
                      onChange={(e) => {
                        handleData(e.target.value, "length");
                      }}
                    />
                  </div>
                  <div style={{ width: "32%" }}>
                    <TextField
                      type="number"
                      label="ความสูง"
                      placeholder="ความสูงของสินค้า"
                      fullWidth
                      variant="outlined"
                      {...defaultInputProp}
                      value={data.height}
                      onChange={(e) => {
                        handleData(e.target.value, "height");
                      }}
                    />
                  </div>
                </div>
                <TextField
                  className={classes.inputForm}
                  label="รายละเอียดสินค้า"
                  placeholder="เพิ่มรายละเอียดสินค้าที่จะแสดงบนเว็บ e-commerce ต่างๆ ที่คุณต้องการเชื่อมต่อ. . ."
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={5}
                  variant="outlined"
                  value={data.description}
                  onChange={(e) => {
                    handleData(e.target.value, "description");
                  }}
                />
                {/* </div> */}
              </Paper>
            </Grid>
            <Grid item sm={12} lg={4}>
              <Paper elevation={2} className={classes.product_image}>
                <Typography style={{ textAlign: "center", fontWeight: "bold" }}>เพิ่มรูปภาพสินค้า</Typography>
                <div className={classes.imageBox}>
                  <div className={classes.imageContent}>
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png"
                      alt="upload"
                      width="50px"></img>
                    <div style={{ paddingBottom: "4%" }}>จำนวนรูปภาพอัพได้สูงสุดที่ 4 รูป</div>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => {
                        handleUploadClick(e);
                      }}
                    />
                    <Button
                      component="label"
                      htmlFor="contained-button-file"
                      style={{ width: "60%" }}
                      variant="contained"
                      color="primary">
                      UPLOAD
                    </Button>
                  </div>
                </div>
                <List style={{ overflowY: "auto", height: "170px", marginTop: "1%" }}>
                  {data.image.map((item, index) => {
                    return (
                      <ListItem key={shortid.generate()}>
                        <ListItemAvatar>
                          <img src={item.src} alt="upload" width="40px" height="40px"></img>
                        </ListItemAvatar>
                        <Tooltip title={item.name} aria-label="add">
                          <ListItemText primary={item.name.slice(0, 30) + (item.name.length > 30 ? "..." : "")} />
                        </Tooltip>
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              onDeleteItem("image", index);
                            }}
                            edge="end"
                            aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Paper elevation={2} className={classes.table_box}>
          <div style={{ padding: "1% 0%" }}>
            <Typography className={classes.textGroup} style={{ padding: "1% 0%" }}>
              ข้อมูลจำเพาะของสินค้า
            </Typography>
            <AppBar position="static" color="primary" className={classes.subProductBar}>
              <Tabs value={tabSelected} indicatorColor="secondary" onChange={handleChangeTabs} aria-label="disabled tabs example">
                <Tab className={classes.textTab} label="แบบธรรมดา" />
                <Tab className={classes.textTab} label="แบบกำหนดคุณลักษณะ" />
              </Tabs>
            </AppBar>

            {tabSelected === 0 && (
              <Button
                style={{ marginRight: "1%", marginLeft: "1%" }}
                variant="outlined"
                color="primary"
                onClick={addNewSubProduct}>
                เพิ่มสินค้าย่อย
              </Button>
            )}

            {tabSelected === 1 && (
              <Button
                onClick={() => handleDialog(true)}
                style={{ marginRight: "1%", marginLeft: "1%" }}
                variant="outlined"
                color="primary">
                จัดการคุณลักษณะของสินค้า
              </Button>
            )}
            <Button style={{ marginRight: "1%" }} variant="outlined" color="primary">
              ตั้งSKUอัตโนมัติ
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow hover className={classes.theadRow}>
                  <TableCell className={classes.theadCell}>SKU</TableCell>
                  <TableCell className={classes.theadCell}>ชื่อสินค้า</TableCell>
                  <TableCell width="13%" className={classes.theadCell}>
                    ราคา
                  </TableCell>
                  <TableCell width="10%" className={classes.theadCell}>
                    จำนวน
                  </TableCell>
                  <TableCell width="12%" className={classes.theadCell}>
                    Keyword
                  </TableCell>
                  {tabSelected === 1 && (
                    <TableCell align={"center"} width="20%" className={classes.theadCell}>
                      Options
                    </TableCell>
                  )}

                  {tabSelected === 0 && (
                    <TableCell width="3%" className={classes.theadCell}>
                      Action
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.subproduct.map((item, index) => {
                  return (
                    <TableRow key={index} hover className={classes.theadRow}>
                      <TableCell>
                        <TextField
                          style={{ width: "90%" }}
                          required
                          value={item.sku}
                          InputProps={{ classes: { input: classes.input_table } }}
                          size="small"
                          variant="outlined"
                          onChange={(e) => {
                            onChangeSubProduct(e.target.value, index, "sku");
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          style={{ width: "90%" }}
                          required
                          value={item.name}
                          InputProps={{ classes: { input: classes.input_table } }}
                          size="small"
                          variant="outlined"
                          onChange={(e) => {
                            onChangeSubProduct(e.target.value, index, "name");
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          style={{ width: "90%" }}
                          InputProps={{
                            classes: { input: classes.input_table },
                            endAdornment: <span style={{ padding: "4px" }}>THB</span>,
                          }}
                          type="number"
                          value={item.price}
                          required
                          size="small"
                          variant="outlined"
                          onChange={(e) => {
                            onChangeSubProduct(e.target.value, index, "price");
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          style={{ width: "90%" }}
                          InputProps={{ classes: { input: classes.input_table } }}
                          size="small"
                          required
                          value={item.stock}
                          type="number"
                          variant="outlined"
                          onChange={(e) => {
                            onChangeSubProduct(e.target.value, index, "stock");
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          style={{ width: "90%" }}
                          required
                          value={item.keyword}
                          InputProps={{ classes: { input: classes.input_table } }}
                          size="small"
                          variant="outlined"
                          onChange={(e) => {
                            onChangeSubProduct(e.target.value, index, "keyword");
                          }}
                        />
                      </TableCell>
                      {tabSelected === 1 && (
                        <TableCell align="center">
                          {data.attribute.map((key, index) => {
                            return (
                              <Chip
                                style={{ width: "30%", margin: "0% 2%" }}
                                key={key + index}
                                variant="outlined"
                                color="primary"
                                label={item.attribute[key.name]}
                              />
                            );
                          })}
                        </TableCell>
                      )}
                      {tabSelected === 0 && index !== 0 && (
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              onDeleteItem("subproduct", index);
                            }}
                            edge="end"
                            aria-label="delete">
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog
          open={open}
          handleAttr={saveSubProductAttr}
          changed={dialogState}
          handleClose={() => {
            handleDialog(false);
          }}>
          <AutocompleteChip
            handleChangeAttribute={handleChangeAttribute}
            indexKey="attribute"
            item={data.attribute.map((data) => data.name)}
            label="ประเภทข้อมูล"
            variant="default"
            helperText="ตัวอย่างเช่น สี ขนาด ความกว้าง ความยาว เป็นต้น"
            color="primary"
          />
          {data.attribute.map((data, index) => {
            return (
              <AutocompleteChip
                key={data.name + index}
                indexKey={data.name}
                handleChangeAttribute={handleChangeAttributeValue}
                item={data.value}
                label={"ค่าของ" + data.name}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </Dialog>
      </div>
      {/* </Hidden>
       */}
    </form>
  );
}

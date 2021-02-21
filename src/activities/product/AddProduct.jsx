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
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";

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
    boxShadow: "5px 5px 20px rgb(233,233,233)",
    borderRadius: "10px",
  },
  product_image: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: "1% 1.5% 3% 1.5%",
    boxShadow: "5px 5px 20px rgb(233,233,233)",
    borderRadius: "10px",
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
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },
  imageContent: {
    textAlign: "center",
  },
  table_box: {
    padding: "0% 1.5% 3% 1.5%",
    width: "100%",
    backgroundColor: "white",
    boxShadow: "5px 5px 20px rgb(233,233,233)",
    marginTop: "1.5%",
  },
});

export default function AddProduct(props) {
  const classes = useStyles();
  const [data, setData] = React.useState({
    name: "",
    weight: undefined,
    description: "",
    delivery_price: undefined,
    width: undefined,
    height: undefined,
    length: undefined,
    attribute: [],
    image: [],
    sale_channnel: [],
  });

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
      console.log(data.image)
    };
  };

  return (
    <form>
      <div style={{ paddingTop: "1%", paddingLeft: "0.5%", paddingRight: "0.5%" }}>
        <div className={classes.productadd_header}>
          <BreadCrumbs before={[{ href: "/dashboard", name: "หน้าแรก" }]} presentpage="เพิ่มสินค้า" />
          <div style={{ marginRight: "1%" }}>
            <Button variant="contained" color="primary">
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "1%" }}>
          <Grid container spacing={1}>
            <Grid item sm={12} lg={8}>
              {/* <div className={classes.flexbox}> */}
              <div className={classes.product_detail}>
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
              </div>
            </Grid>
            <Grid item sm={12} lg={4}>
              <div className={classes.product_image}>
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
                      <ListItem key={item.name+index}>
                        <ListItemAvatar>
                            <img
                              src={item.src}
                              alt="upload"
                              width="40px"
                              height="40px"></img>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.table_box}>
          <div style={{ padding: "1% 0%" }}>
            <Typography className={classes.textGroup} style={{ padding: "1% 0%" }}>
              ข้อมูลจำเพาะของสินค้า
            </Typography>
            <Button style={{ marginRight: "1%" }} variant="outlined" color="primary">
              เพิ่มสินค้าย่อย
            </Button>
            <Button style={{ marginRight: "1%" }} variant="outlined" color="primary">
              จัดการประเภทของสินค้า
            </Button>
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
                  <TableCell className={classes.theadCell}>ราคา</TableCell>
                  <TableCell className={classes.theadCell}>จำนวน</TableCell>
                  <TableCell className={classes.theadCell}>Keyword</TableCell>
                  {["size", "color"].map((data, index) => {
                    return (
                      <TableCell key={index} width="7%" className={classes.theadCell}>
                        {data.name}
                      </TableCell>
                    );
                  })}
                  <TableCell width="10%" className={classes.theadCell}>
                    ซิงค์ข้อมูล
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
    </form>
  );
}

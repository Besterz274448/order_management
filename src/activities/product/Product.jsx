import React, { Component } from "react";
import ProductHeader from "./ProductHeader";
import MenuTabs from "./MenuTabs";
import { getAllProduct, createProduct } from "../../config/product";
import MainProduct from "./MainProduct";
import SubProduct from "./SubProduct";
import ProductDialog from "./ProductDialog";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_data: [],
      subproduct_data: [],
      product_image: [],
      new_product: {
        name: "",
        delivery_price: 0,
        weight: 0,
        description: "",
      },
      new_subproduct: [],
      variants: [],

      edit_product_data: {
        name: "",
        delivery_price: 0,
        weight: 0,
        description: "",
      },
      edit_product_image: [],
      edit_subproduct_data: [],
      edit_variants: [],
      addModal: false,
      editModal: false,
      tabSelected: 0,
      filter: "sku",
      operation: "<",
      search_key: "",
      search_key2: "",
    };
  }

  componentDidMount() {
    getAllProduct((result) => {
      this.setState({
        product_data: result[0],
        subproduct_data: result[1],
      });
    });
  }

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      await this.setState({
        product_image: [...this.state.product_image, reader.result],
      });
    };
  };

  handleNewProduct = (value, key) => {
    let newValue = this.state.new_product;
    newValue[key] = value;
    this.setState({
      new_product: newValue,
    });
  };

  handleNewSubProduct = (value, key, index) => {
    let newValue = this.state.new_subproduct;
    newValue[index][key] = value;
    this.setState({
      new_subproduct: newValue,
    });
  };

  handleChangeTabs = (event, newValue) => {
    this.setState({
      search_key: "",
      search_key2: "",
      tabSelected: newValue,
    });
  };

  cartesianProduct = (item) => {
    const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
    const attr = item.map((data) => data.name);
    const value = item.map((data) => data.value);
    if (attr.length > 0) {
      let newData = [];
      if (attr.length === 1) {
        const newItem = value[0];
        for (let i = 0; i < newItem.length; i++) {
          let item = {};
          item[attr[0]] = newItem[i];
          newData.push({ product_id: "", sku: "", name: "", attribute: item, price: 0, stock: 0, order: 0, sold: 0, keyword: "" });
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
    return [];
  };

  handleChangeAttribute = (value) => {
    let newItem = this.state.variants;
    newItem = value.map((data) => {
      let index = newItem.map((data) => data.name).indexOf(data);
      let valueAttr = [];
      if (index !== -1) {
        valueAttr = newItem[index].value.length > 0 ? newItem[index].value : [];
      }
      return { name: data, value: valueAttr };
    });
    let newAttr = this.cartesianProduct(newItem);
    this.setState({
      variants: newItem,
      new_subproduct: newAttr,
    });
  };

  handleChangeAttributeValue = (value, name) => {
    let newItem = this.state.variants;
    const index = newItem.map((data) => data.name).indexOf(name);
    newItem[index].value = value;
    let newAttr = this.cartesianProduct(newItem);
    this.setState({
      variants: newItem,
      new_subproduct: newAttr,
    });
  };

  handleClickOpen = (tag) => {
    this.setState({
      [tag]: true,
    });
  };

  handleClickClose = (tag) => {
    this.setState({
      [tag]: false,
    });
  };

  handleCreateProduct = (e) => {
    e.preventDefault();
    let { product_image, new_product, new_subproduct, variants } = this.state;
    if (new_subproduct.length > 0) {
      new_product["image"] = product_image;
      new_product["attribute"] = variants;
      new_product["sale_channel"] = [];
      createProduct({ new_product, new_subproduct });
    }
  };

  handleSearchData = (index, value) => {
    this.setState({
      [index]: value,
    });
  };

  handleChangeFilter = (value) => {
    this.setState({
      filter: value,
      search_key: "",
      search_key2: "",
      operation: ">",
    });
  };

  handleChangeOperation = (value) => {
    this.setState({
      operation: value,
      search_key: "",
      search_key2: "",
    });
  };

  confirmEditData = (index, data) => {
    console.log(data);
    console.log(this.state.subproduct_data[index]);
    //createEditHistory
  };

  openEditModal = (id) => {
    let subProduct = this.state.subproduct_data.filter((data) => id === data.product_id);
    let editData = this.state.product_data.filter((data) => data.id === id)[0];
    console.log(editData);
    this.setState({
      edit_product_data: {...editData},
      edit_product_image: editData.image,
      edit_subproduct_data: subProduct,
      edit_variants: editData.attribute,
    },()=>{
      this.handleClickOpen("editModal")      
    });
  };

  render() {
    return (
      <div>
        <ProductHeader
          handleClickOpen={this.handleClickOpen}
          dataLength={this.state.product_data.length}
          search_key={this.state.search_key}
          search_key2={this.state.search_key2}
          tabSelected={this.state.tabSelected}
          handleSearchData={this.handleSearchData}
          filter={this.state.filter}
          operation={this.state.operation}
          handleChangeFilter={this.handleChangeFilter}
          handleChangeOperation={this.handleChangeOperation}
        />
        <ProductDialog
          headName={{ id: "เพิ่มสินค้า", label: "addModal" }}
          handleClickClose={this.handleClickClose}
          handleProduct={this.handleCreateProduct}
          handleChangeAttributeValue={this.handleChangeAttributeValue}
          handleUploadClick={this.handleUploadClick}
          handleChangeAttribute={this.handleChangeAttribute}
          handleNewProduct={this.handleNewProduct}
          handleNewSubProduct={this.handleNewSubProduct}
          open={this.state.addModal}
          newProduct={this.state.new_product}
          image={this.state.product_image}
          sub_product={this.state.new_subproduct}
          variants={this.state.variants}
        />
        <ProductDialog
          headName={{ id: "แก้ไขสินค้า", label: "editModal" }}
          handleClickClose={this.handleClickClose}
          handleProduct={this.handleCreateProduct}
          handleChangeAttributeValue={this.handleChangeAttributeValue}
          handleUploadClick={this.handleUploadClick}
          handleChangeAttribute={this.handleChangeAttribute}
          handleNewProduct={this.handleNewProduct}
          handleNewSubProduct={this.handleNewSubProduct}
          open={this.state.editModal}
          newProduct={this.state.edit_product_data}
          image={this.state.edit_product_image}
          sub_product={this.state.edit_subproduct_data}
          variants={this.state.edit_variants}
        />
        <MenuTabs
          handleChange={this.handleChangeTabs}
          value={this.state.tabSelected}
          MainProductTable={
            <MainProduct
              rows={this.state.product_data}
              openEditModal={this.openEditModal}
              search_key={this.state.tabSelected === 0 ? this.state.search_key : ""}
            />
          }
          SubProductTable={
            <SubProduct
              rows={this.state.subproduct_data}
              search_key={this.state.tabSelected === 1 ? this.state.search_key : ""}
              search_key2={this.state.search_key2}
              filter={this.state.filter}
              operation={this.state.operation}
              confirmEditData={this.confirmEditData}
            />
          }
          LowStockTable={
            <SubProduct rows={this.state.subproduct_data} search_key={"10"} search_key2={""} filter={"stock"} operation={"<"} />
          }
        />
      </div>
    );
  }
}

export default Product;

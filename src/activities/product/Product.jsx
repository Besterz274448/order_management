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
      tabSelected: 0,
      open: true,
      addModal: false,
      filter: "sku",
      operation: "<",
      search_key: "",
      search_key2: "",
    };
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
          newData.push({ product_id: "", sku: "", name: "", attr: item, price: 0, stock: 0, order: 0, sold: 0, keyword: "" });
        }
        return newData;
      }
      let cartesianData = cartesian(...value);
      for (let i = 0; i < cartesianData.length; i++) {
        let item = {};
        for (let j = 0; j < attr.length; j++) {
          item[attr[j]] = cartesianData[i][j];
        }
        newData.push({ product_id: "", sku: "", name: "", attr: item, price: 0, stock: 0, order: 0, sold: 0, keyword: "" });
      }
      return newData;
    }
    return [];
  };

  handleSearchData = (index, value) => {
    this.setState({
      [index]: value,
    });
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

  handleClickOpen = () => {
    this.setState({
      addModal: true,
    });
  };

  handleClickClose = () => {
    this.setState({
      addModal: false,
    });
  };

  componentDidMount() {
    getAllProduct((result) => {
      this.setState({
        product_data: result[0],
        subproduct_data: result[1],
      });
    });
  }

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
          handleChangeAttributeValue={this.handleChangeAttributeValue}
          handleClickClose={this.handleClickClose}
          handleUploadClick={this.handleUploadClick}
          handleChangeAttribute={this.handleChangeAttribute}
          image={this.state.product_image}
          open={this.state.addModal}
          sub_product={this.state.new_subproduct}
          variants={this.state.variants}
          newProduct={this.state.new_product}
          handleNewProduct={this.handleNewProduct}
          handleNewSubProduct={this.handleNewSubProduct}
          handleCreateProduct={this.handleCreateProduct}
        />
        <MenuTabs
          handleChange={this.handleChangeTabs}
          value={this.state.tabSelected}
          MainProductTable={
            <MainProduct rows={this.state.product_data} search_key={this.state.tabSelected === 0 ? this.state.search_key : ""} />
          }
          SubProductTable={
            <SubProduct
              rows={this.state.subproduct_data}
              search_key={this.state.tabSelected === 1 ? this.state.search_key : ""}
              search_key2={this.state.search_key2}
              filter={this.state.filter}
              operation={this.state.operation}
            />
          }
        />
      </div>
    );
  }
}

export default Product;

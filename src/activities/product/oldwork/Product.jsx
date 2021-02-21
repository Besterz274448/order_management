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
    this.textwa = React.createRef();
  }

  componentDidMount() {
    getAllProduct((result) => {
      this.setState({
        product_data: result[0],
        subproduct_data: result[1],
      });
    });
  }

  handleUploadClick = (event, type) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      await this.setState({
        [type]: [...this.state[type], reader.result],
      });
    };
  };

  handleNewProduct = (value, key, type) => {
    let newValue = this.state[type];
    newValue[key] = value;
    this.setState({
      [type]: newValue,
    });
  };

  handleNewSubProduct = (value, key, index, type) => {
    let newValue = this.state[type];
    newValue[index][key] = value;
    this.setState({
      [type]: newValue,
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
          newData.push({
            product_id: "",
            sku: "",
            name: "",
            attribute: item,
            price: 0,
            stock: 0,
            order: 0,
            sold: 0,
            keyword: "",
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
    return [];
  };

  handleChangeAttribute = (value, name, type_variants, type_sub) => {
    let newItem = this.state[type_variants];
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
      [type_variants]: newItem,
      [type_sub]: newAttr,
    });
  };

  handleChangeAttributeValue = (value, name, type_variants, type_sub) => {
    let newItem = this.state[type_variants];
    const index = newItem.map((data) => data.name).indexOf(name);
    newItem[index].value = value;
    let newAttr = this.cartesianProduct(newItem);
    this.setState({
      [type_variants]: newItem,
      [type_sub]: newAttr,
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
    this.setState(
      {
        edit_product_data: { ...editData },
        edit_product_image: JSON.parse(JSON.stringify(editData.image)),
        edit_subproduct_data: JSON.parse(JSON.stringify(subProduct)),
        edit_variants: JSON.parse(JSON.stringify(editData.attribute)),
      },
      () => {
        this.handleClickOpen("editModal");
      }
    );
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
          type={{ image: "product_image", product: "new_product", sub: "new_subproduct", variants: "variants" }}
          handleClickClose={this.handleClickClose}
          handleProduct={this.handleCreateProduct}
          handleUploadClick={this.handleUploadClick}
          handleNewProduct={this.handleNewProduct}
          handleNewSubProduct={this.handleNewSubProduct}
          handleChangeAttributeValue={this.handleChangeAttributeValue}
          handleChangeAttribute={this.handleChangeAttribute}
          open={this.state.addModal}
          newProduct={this.state.new_product}
          image={this.state.product_image}
          sub_product={this.state.new_subproduct}
          variants={this.state.variants}
        />
        <ProductDialog
          headName={{ id: "แก้ไขสินค้า", label: "editModal" }}
          type={{image: "edit_product_image",product: "edit_product_data",sub: "edit_subproduct_data",variants: "edit_variants",}}
          handleClickClose={this.handleClickClose}
          handleProduct={(e) => { e.preventDefault();alert("test");}}
          handleUploadClick={this.handleUploadClick}
          handleNewProduct={this.handleNewProduct}
          handleNewSubProduct={this.handleNewSubProduct}
          handleChangeAttributeValue={this.handleChangeAttributeValue}
          handleChangeAttribute={this.handleChangeAttribute}
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

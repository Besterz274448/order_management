import React, { Component } from "react";
import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import SubProductTable from "./SubProductTable";
import { getAllProduct, createProduct } from "../../config/product";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_data: [],
      subproduct_data: [],
      product_image: [],
      editModal: false,
      tabSelected: 0,
      filter: "name",
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

  render() {
    return (
      <div>
        <ProductHeader
          dataLength={this.state.product_data.length}
          search_key={this.state.search_key}
          search_key2={this.state.search_key2}
          tabSelected={this.state.tabSelected}
          handleChangeTabs={this.handleChangeTabs}
          handleSearchData={this.handleSearchData}
          filter={this.state.filter}
          operation={this.state.operation}
          handleChangeFilter={this.handleChangeFilter}
          handleChangeOperation={this.handleChangeOperation}
        />
        <div style={{ marginTop: "1%", boxShadow: "2px 2px 5px rgb(215,215,215)" }}>
          {this.state.tabSelected === 0 && (
            <ProductTable
              rows={this.state.product_data}
              openEditModal={this.openEditModal}
              search_key={this.state.tabSelected === 0 ? this.state.search_key : ""}
            />
          )}

          {this.state.tabSelected === 1 && (
            <SubProductTable
              rows={this.state.subproduct_data}
              search_key={this.state.tabSelected === 1 ? this.state.search_key : ""}
              search_key2={this.state.search_key2}
              filter={this.state.filter}
              operation={this.state.operation}
              confirmEditData={this.confirmEditData}
            />
          )}
          {this.state.tabSelected === 2 && (
            <SubProductTable
              rows={this.state.subproduct_data}
              search_key={"10"}
              search_key2={this.state.search_key2}
              filter={"stock"}
              operation={"<"}
              confirmEditData={this.confirmEditData}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Product;

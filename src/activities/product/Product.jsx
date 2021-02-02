import React, { Component } from "react";
import ProductHeader from "./ProductHeader";
import MenuTabs from "./MenuTabs";
import { getAllProduct } from "../../config/product";
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
        attribute: [],
      },
      tabSelected: 0,
      open: true,
      addModal: false,
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

  handleChangeTabs = (event,newValue) => {
    this.setState({
      tabSelected: newValue,
    });
  };

  handleChangeAttribute = (value) => {
    let newItem = this.state.new_product;
    newItem.attribute = newItem.attribute.concat(value);
    console.log(newItem.attribute);
    this.setState({
      new_product: newItem,
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
  render() {
    return (
      <div>
        <ProductHeader handleClickOpen={this.handleClickOpen} dataLength={this.state.product_data.length} />
        <ProductDialog
          handleClickClose={this.handleClickClose}
          handleUploadClick={this.handleUploadClick}
          handleChangeAttribute={this.handleChangeAttribute}
          image={this.state.product_image}
          open={this.state.addModal}
          new_product={this.state.new_product}
        />
        <MenuTabs
          handleChange={this.handleChangeTabs}
          value={this.state.tabSelected}
          MainProductTable={<MainProduct rows={this.state.product_data} />}
          SubProductTable={<SubProduct rows={this.state.subproduct_data} />}
        />
      </div>
    );
  }
}

export default Product;

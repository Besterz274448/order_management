import React, { Component } from "react";
import ProductHeader from "./ProductHeader";
import MenuTabs from "./MenuTabs";
import {getAllProduct} from '../../config/product';
import MainProduct from "./MainProduct";
import SubProduct from "./SubProduct";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_data: [],
      subproduct_data:[],
      filter_data: [],
      filter_selected: "id",
      operator_selected: ">",
      defaultSearch: "",
      open: true,
    };
  }

  componentDidMount() {
    getAllProduct((result)=>{
      this.setState({
        product_data: result[0],
        subproduct_data: result[1]
      })
    });
  }
  render() {
    return (
      <div>
        <ProductHeader />
        <MenuTabs
          MainProductTable={<MainProduct rows={this.state.product_data} />}
          SubProductTable={<SubProduct rows={this.state.subproduct_data} />}
        />
      </div>
    );
  }
}

export default Product;

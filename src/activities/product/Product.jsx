import React, { Component } from "react";
import ProductHeader from "./ProductHeader";
import MenuTabs from "./MenuTabs";
import MainProduct from "./MainProduct";
import SubProduct from "./SubProduct";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      data: [],
      filter_data: [],
      filter_selected: "id",
      operator_selected: ">",
      defaultSearch: "",
      open: true,
    };
  }

  fetchProductData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        // const data = JSON.parse(xhr.responseText);
        // this.setState({
        //   product: [...data],
        // });
      }
    };
    xhr.open("GET", "https://asia-south1-ru-test-5ee10.cloudfunctions.net/products/");
    xhr.send();
  };

  componentDidMount() {
    this.fetchProductData();
  }
  render() {
    return (
      <div>
        <ProductHeader />
        <MenuTabs
          MainProductTable={<MainProduct rows={this.state.data} />}
          SubProductTable={<SubProduct rows={this.state.data} />}
        />
      </div>
    );
  }
}

export default Product;

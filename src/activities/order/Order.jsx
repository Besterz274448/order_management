import React, { Component } from "react";
import OrderTable from "./OrderTable";
import OrderHeader from "./OrderHeader";
import { getAllOrder } from "../../config/order";

class Order extends Component {
  state = {
    tabSelected: 0,
    search_key: "",
    key: "order_id",
    order_data: [],
  };

  handleSearchData = (value) => {
    this.setState({
      search_key: value,
    });
  };

  handleChangeFilter = (value) => {
    this.setState({
      key: value,
    });
  };

  handleTab = (event, newValue) => {
    this.setState({
      tabSelected: newValue,
    });
  };

  componentDidMount() {
    getAllOrder((result) => {
      this.setState({
        order_data: result,
      });
    });
  }

  render() {
    return (
      <div>
        <OrderHeader
          filter={this.state.key}
          handleChangeFilter={this.handleChangeFilter}
          search_key={this.state.search_key}
          handleSearchData={this.handleSearchData}
          tab={this.state.tabSelected}
          handleTab={this.handleTab}
        />
        <OrderTable
          tab={this.state.tabSelected}
          rows={this.state.order_data
            .filter((data) => data[this.state.key].toLowerCase().includes(this.state.search_key.toLowerCase()))
            .filter((data) => data.status === this.state.tabSelected + 1)}
        />
      </div>
    );
  }
}

export default Order;

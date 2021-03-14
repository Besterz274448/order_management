import React, { Component } from "react";
import OrderTable from "./OrderTable";
import OrderHeader from "./OrderHeader";
import { getAllOrder } from "../../config/order";
import Drawer from "./component/Drawer";
import Dialog from "./component/OrderDialog";

class Order extends Component {
  state = {
    tabSelected: 0,
    search_key: "",
    key: "order_id",
    order_data: [],
    drawer: false,
    selected_data:""
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

  // toggleDrawer = (e,open,id) => {
  //   if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
  //     return;
  //   }
  //   if(id != null){
  //     this.setState({selected_data:id})
  //   }
  //   this.setState({ drawer: open });
  // };

  toggleDrawer = (open,id)=>{
    this.setState({drawer:open});
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
        {/* <Drawer position="left" drawer={this.state.drawer} toggleDrawer={this.toggleDrawer} selected_data={this.state.selected_data} /> */}
        <Dialog open={this.state.drawer} openDialog={this.toggleDrawer.bind(this,true)} closeDialog={this.toggleDrawer.bind(this,false)}/>
        <OrderTable
          toggleDrawer={this.toggleDrawer}
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

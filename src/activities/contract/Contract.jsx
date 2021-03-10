import React, { Component } from "react";
import ContractHeader from "./ContractHeader";
import ContractTable from "./ContractTable";

const contract = [
  {
    facebook: "a123456789",
    fullname: "ton test1",
    address: "7/93 rayong",
    postal_code: "21130",
    telephone_number: "088-2320853",
    status: true,
  },
  {
    facebook: "b789sa",
    fullname: "ton test2",
    address: "7/93 rayong",
    postal_code: "21130",
    telephone_number: "088-2320853",
    status: true,
  },
  {
    facebook: "c9755sa6dqw",
    fullname: "ton test3",
    address: "7/93 rayong",
    postal_code: "21130",
    telephone_number: "088-2320853",
    status: true,
  },
  {
    facebook: "daaadada755sa6dqw",
    fullname: "ton tes4t",
    address: "7/93 rayong",
    postal_code: "21130",
    telephone_number: "088-2320853",
    status: true,
  },
  {
    facebook: "totototsaq",
    fullname: "ton tes5t",
    address: "7/93 rayong",
    postal_code: "21130",
    telephone_number: "088-2320853",
    status: true,
  },

];

class Contract extends Component {
  state ={
    search_key:"",
    key:"facebook",
  }

  handleChangeSearch = (value)=>{
    this.setState({
      search_key:value
    })
  }

  handleChangeFilter = (value)=>{
    this.setState({
      key:value
    })
  }

  render() {
    return (
      <div>
        <div id="contract_header">
          <ContractHeader handleChangeFilter={this.handleChangeFilter} handleSearchData={this.handleChangeSearch} filter={this.state.key} search_key={this.state.search_key} />
        </div>
        <div id="contract_table" style={{ marginTop: "1%" }}>
          <ContractTable rows={contract.filter(data=>data[this.state.key].includes(this.state.search_key))} />
        </div>
      </div>
    );
  }
}

export default Contract;

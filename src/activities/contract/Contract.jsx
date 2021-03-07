import React, { Component } from "react";
import ContractHeader from  './ContractHeader'
import ContractTable from  './ContractTable'

class Contract extends Component {
  render() {
    return <div>
        <div id="contract_header">
            <ContractHeader/>
        </div>
        <div id="contract_table" style={{marginTop:"1%"}}>
            <ContractTable/>
        </div>

    </div>;
  }
}

export default Contract;

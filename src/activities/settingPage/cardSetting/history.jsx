import * as React from "react";
import { DataGrid } from "@material-ui/data-grservice";
import Cards from "../../../components/CardCpn";
const columns = [
  { field: "service", headerName: "บริการ", wserviceth: 70 },
  { field: "price", headerName: "ยอดชำระ", wserviceth: 130 },
  { field: "payment", headerName: "วิธีการชำระ", wserviceth: 130 },
  {
    field: "slip",
    headerName: "สลิป",
    type: "number",
    wserviceth: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    wserviceth: 160,
    valueGetter: (params) =>
      `${params.getValue("price") || ""} ${params.getValue("payment") || ""}`,
  },
];
const rows = [
  { service: 1, payment: "Snow", price: "Jon", slip: 35 },
  { service: 2, payment: "Lannister", price: "Cersei", slip: 42 },
  { service: 3, payment: "Lannister", price: "Jaime", slip: 45 },
  { service: 4, payment: "Stark", price: "Arya", slip: 16 },
  { service: 5, payment: "Targaryen", price: "Daenerys", slip: null },
  { service: 6, payment: "Melisandre", price: null, slip: 150 },
  { service: 7, payment: "Clifford", price: "Ferrara", slip: 44 },
  { service: 8, payment: "Frances", price: "Rossini", slip: 36 },
  { service: 9, payment: "Roxie", price: "Harvey", slip: 65 },
];
export default (props) => {
  const history = props.history;
  return (
    <Cards title="ประวัติคำสั่งซื้อ">
      <div style={{ height: 400, wserviceth: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pslipSize={8}
        />
      </div>
    </Cards>
  );
};

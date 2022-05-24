import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
const userRows = [
  {
    id: 1,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 2,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 3,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 4,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 5,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 6,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 7,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 8,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 9,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
  {
    id: 10,
    severity: 5,
    title: "SSL issue",
    status: "pening",
    createdDate: "2022-03-13",
  },
];

function TicketsTable() {
  //using state hook in order to comply with changing as we are deleteing rows
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id)); //map all those that are not equal to the selected row id
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "severity",
      headerName: "Severity",
      width: 130,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 120,
    },
  ];

  return (
    <div
      className="text-white h-4/5 flex pt-8 "
      // style={{ display: "flex", height: "", color: "white" }}
    >
      <DataGrid
        // style={{ color: "white" }}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        autoPageSize
        checkboxSelection
      ></DataGrid>
    </div>
  );
}

export default TicketsTable;

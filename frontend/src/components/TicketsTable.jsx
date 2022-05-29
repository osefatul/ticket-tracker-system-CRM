import React, { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

function TicketsTable({ tickets }) {
  //using state hook in order to comply with changing as we are deleteing rows
  const [data, setData] = useState(tickets);

  // Everytime Tickets list get changed, then change Data as well.
  useEffect(() => {
    setData(tickets);
  }, [tickets]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.id}</div>
          </Link>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.title}</div>
          </Link>
        );
      },
    },
    {
      field: "severity",
      headerName: "Severity",
      width: 130,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.severity}</div>
          </Link>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.status}</div>
          </Link>
        );
      },
    },

    {
      field: "createdDate",
      headerName: "Created Date",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.createdDate}</div>
          </Link>
        );
      },
    },
  ];

  return (
    <div
      className="text-white h-4/5 flex pt-8 "
      // style={{ display: "flex", height: "", color: "white" }}
    >
      <DataGrid
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

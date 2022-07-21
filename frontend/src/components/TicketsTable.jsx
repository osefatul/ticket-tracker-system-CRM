import React, { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

import {useSelector} from "react-redux";




function TicketsTable({dummyTickets }) {

// function TicketsTable() {

  const {tickets, isLoading, error} = useSelector(state => state.tickets)

  //using state hook in order to comply with changing as we are deleting rows
  const [data, setData] = useState(tickets);

  console.log(tickets)
  console.log(data)

  // const classes = useStyles();

  // Every time Tickets list get changed, then change Data as well.
  useEffect(() => {
    setData(tickets);
  }, [tickets]);

  const columns = [
    {
      field: "clientId",
      headerName: "ID",
      width: 220,
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
      width: 100,
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
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.status}</div>
          </Link>
        );
      },
    },

    {
      field: "openAt",
      headerName: "Created Date",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.openAt}</div>
          </Link>
        );
      },
    },
  ];

  return (
    <div
      className="text-white h-5/6 flex pt-8 "
      // style={{ display: "flex", height: "", color: "white" }}
    >
      <DataGrid
        sx={{
          border: 0, // also tried setting to none 
          borderRadius: 2,
          p: 2,
          minWidth: 200,
      }}
        rows={tickets}
        // getRowId = {(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        autoPageSize
        checkboxSelection
      ></DataGrid>
    </div>
  );
}

export default TicketsTable;

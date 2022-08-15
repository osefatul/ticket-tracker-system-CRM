import React, { useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { fetchNewAccessJWT } from "../api/userApi";


function TicketsTable() {

  const {searchTicketList, isLoading, error} = useSelector(state => state.tickets)
  
  if (isLoading) { return  <h3>Loading...</h3>}

  

  const columns = [
    {
      field: "ticketID",
      headerName: "Ticket ID",
      width: 180,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div >T- {params.row._id.slice(0,10)}...</div>
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
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div >{params.row.title.slice(0,25)}...</div>
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
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div>{params.row.severity}</div>
          </Link>
        );
      },
    },

    {
      field: "creator",
      headerName: "Assigner",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div>{params.row.creator}</div>
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
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div 
            className= {
              `${params.row.status === "Assigned" ? "text-red-800": " "}`}>
            {params.row.status.slice(0,15)}...</div>
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
          <Link to={`/ticket_communication/${params.row._id}`}>
            <div>{new Date (params.row.openAt).toLocaleString()}</div>
          </Link>
        );
      },
    },
  ];

  return (

    <div
    className=" text-black h-4/6 flex pt-8 "
    >
      { error ? <h3>{error}</h3>:
    <DataGrid
    sx={{
      border: 0, // also tried setting to none 
      borderRadius: 2,
      p: 2,
      minWidth: 200,
    }}
    rows={searchTicketList}
    // getRowId = {(row) => row._id}
    disableSelectionOnClick
    columns={columns}
    autoPageSize
    checkboxSelection
    ></DataGrid>
  }
    </div>
  
    );
  }

export default TicketsTable;

import React, { useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";



function UsersTable() {

    const{searchUsersList, isLoading, error} = useSelector( state => state.allUsers);

    if (isLoading) { return  <h3>Loading...</h3>}


    const columns = [

        {
        field: "_id",
        headerName: "ID",
        width: 220,
        renderCell: (params) => {
        return (
            <div>{params.row._id}</div>
        );
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 200,
        renderCell: (params) => {
        return (
            // <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.name}</div>
            // </Link>
        );
        },
    },
    {
        field: "department",
        headerName: "Department",
        width: 100,
        renderCell: (params) => {
        return (
            // <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.department}</div>
            // </Link>
        );
        },
    },
    {
        field: "company",
        headerName: "Company",
        width: 100,
        renderCell: (params) => {
        return (
            // <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.company}</div>
            // </Link>
        );
        },
    },

    // {
    //     field: "joinedDate",
    //     headerName: "Joined Date",
    //     width: 200,
    //     renderCell: (params) => {
    //     return (
    //         <Link to={`/ticket_communication/${params.row.id}`}>
    //         <div 
    //         className= {
    //             `${params.row.status === "Resolved" ? "text-green-800":"text-red-800"}`}>
            
    //         {params.row.status}</div>
    //         </Link>
    //     );
    //     },
    // },

    // {
    //     field: "openAt",
    //     headerName: "Created Date",
    //     width: 200,
    //     renderCell: (params) => {
    //     return (
    //         <Link to={`/ticket_communication/${params.row.id}`}>
    //         <div>{new Date (params.row.openAt).toLocaleString()}</div>
    //         </Link>
    //     );
    //     },
    // },
    // ];
    ]
    
    console.log(searchUsersList)
    
    return (

    <div
    className=" text-black h-5/6 flex pt-8 "
    >
        { error ? <h3>{error}</h3>:
        <DataGrid
        sx={{
        border: 0, // also tried setting to none 
        borderRadius: 2,
        p: 2,
        minWidth: 200,
        }}
        rows={searchUsersList}
        getRowId = {(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        autoPageSize
        checkboxSelection
        ></DataGrid>
    }
        </div>
    
    );
}

export default UsersTable
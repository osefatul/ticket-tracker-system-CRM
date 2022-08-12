import React, { useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {columns} from "./users/usersTableColumns "

function UsersTable() {

    const{searchUsersList, isLoading, error} = useSelector( state => state.allUsers);

    if (isLoading) { return  <h3>Loading...</h3>}


    
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
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useSelector } from 'react-redux'
import {columns } from "./util/TIcketsTableColumn"

function AdminTicketsTable() {
    const {searchTicketList, isLoading, error} = useSelector(state => state.tickets)

    if (isLoading) { return  <h3 >Loading...</h3>}

    
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
        minWidth: 300,
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
    )
}

export default AdminTicketsTable
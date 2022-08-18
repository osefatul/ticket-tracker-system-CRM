import React, { useEffect, useState } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {columns} from "./utils/usersTableColumns "
import { getSelectedUserRefresh } from "../../../features/SpecificUerSlice/userSlice";
import { DeleteUser } from "../../../features/SpecificUerSlice/userAction";
import { AiOutlineDelete } from "react-icons/ai";
import { getUsersData } from "../../../features/allUsersSlice/allUsersAction";

function UsersTable() {

    
    const dispatch = useDispatch();
    const{searchUsersList, isLoading, error} = useSelector( state => state.allUsers);


    
    // const handleDelete = (id) =>{
    //     try {
    //         dispatch(DeleteUser(id));
    //         setData(dispatch(getUsersData()))

    //     }catch(e) {
    //         console.log(e)
    //     }
    // }

    //Run this every time I visit this page. Reason for this is that sometimes the home page Main Icon doesn't remove the selectedUser value even though I have run the same code.
    useEffect(()=>{
        // dispatch(getSelectedUserRefresh())
        // dispatch(getUsersData())
    },[])

    if (isLoading) { return  <h3>Loading...</h3>}



    const columns = [

        {
        field: "_id",
        headerName: "ID",
        width: 160,
        renderCell: (params) => {
        return (
            <div>User-{params.row._id.slice(0,7)}</div>
        );
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 90,
        renderCell: (params) => {
        return (
            // <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.name}</div>
            // </Link>
        );
        },
    },
    
    {
        field: "email",
        headerName: "Email",
        width: 200,
        renderCell: (params) => {
        return (
            // <Link to={`/ticket_communication/${params.row.id}`}>
            <div>{params.row.email}</div>
            // </Link>
        );
        },
    },
    
    {
        field: "department",
        headerName: "Department",
        width: 120,
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
    
    {
        field: "isVerified",
        headerName: "Verified",
        width: 100,
        renderCell: (params) => {
        return (
    
            <div 
            className= {
                `${params.row.isVerified? "text-green-800":"text-red-800"}`}>
            {params.row.isVerified? "Yes":"No" }</div>
        );
        },
    },
    {
        field: "isAdmin",
        headerName: "Admin",
        width: 100,
        renderCell: (params) => {
        return (
    
            <div 
            className= {
                `${params.row.isAdmin? "text-green-800":"text-red-800"}`}>
            {params.row.isAdmin? "Yes":"No" }</div>
        );
        },
    },
    
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
        return (
        <>
            <Link to={"/user_details/" + params.row._id}>
            <button
            className="bg-green-700 w-[40px] rounded-sm text-slate-200 text-sm">Edit</button>
            </Link>
            <AiOutlineDelete
            className="text-red-700 w-[20px] h-[20px] ml-2 cursor-pointer "
            // onClick={ handleDelete(params.row._id)}
            />
        </>
        );
    },
    },
    
    ]




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
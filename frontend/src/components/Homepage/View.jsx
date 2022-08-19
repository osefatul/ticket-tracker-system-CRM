import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { filterSearchUser, getUsersData } from '../../features/allUsersSlice/allUsersAction';
import { DeleteUser } from '../../features/SpecificUerSlice/userAction';
import { fetchAllTicketsForAdmin, filterSearchAdminTicket } from '../../features/ticketSlice/ticketAction';
import AdminPanel from './AdminPanel';
import Settings from './settings/Settings';
import AdminTicketsTable from './tickets/AdminTicketsTable';
import UsersTable from './users/UsersTable';

function View({user}) {

    const dispatch = useDispatch();
    const { tabSelected } = useSelector((state) => state.homeTabs);
    const {users: {users, search}} = useSelector ((state) => state.allUsers)
    



    useEffect(()=>{

        if(tabSelected === "Users"){
            //if no user found fetch users
            if(!users?.length){
                dispatch(getUsersData())
            }
        }
        if(tabSelected === "Tickets"){ 
            dispatch(fetchAllTicketsForAdmin())
        }
        

    },[users, dispatch, tabSelected,]);



    const handleOnChange =(e)=>{
        const {value} = e.target;
        if(tabSelected === "Users"){
            dispatch(filterSearchUser(value))
        }
        else if(tabSelected === "Tickets"){
            dispatch(filterSearchAdminTicket(value))
        }
    }



    return (
        <div className="homeHeight w-[80%] sm:w-[85%] text-black">
                
            {tabSelected ?
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-7">
                    <div className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[15px] sm:text-[24px]">
                    {tabSelected === "Users" || tabSelected === "Tickets"? `${tabSelected} Database` : `${tabSelected}`}
                    </div>
                
                    {tabSelected !== "Settings" &&

                    <div className="text-gray-500 flex items-center justify-center border border-1 h-8 pl-2 space-x-2 cursor-pointer rounded-md">
                        <AiOutlineSearch className />
                        <input
                            type="text"
                            name="searchTicket"
                            onChange={handleOnChange}
                            //value={searchString}
                            placeholder={`Search for ${tabSelected === "Users"? "Users": "Tickets"}`}
                            className="focus:outline-none flex items-center justify-center text-[13px]"
                            />
                    </div>
                        }
                </div>:

                <div className="flex flex-col items-center justify-center ">
                    <h1 className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[16px] sm:text-[30px]">
                        {`Welcome ${
                            user.name.charAt(0).toUpperCase() + user.name.slice(1)
                        } to Admin Panel`}</h1>
                    <AdminPanel/>
                </div>
            }

            {/* Table should be used with height of element */}
            
            {
                tabSelected === "Users"?
                <UsersTable /> : tabSelected === "Tickets" ? <AdminTicketsTable/> : tabSelected === "Settings" ? <Settings/> : ""
            }

        </div>
    )
}

export default View
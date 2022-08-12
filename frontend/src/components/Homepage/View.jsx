import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { filterSearchUser, getUsersData } from '../../features/allUsersSlice/allUsersAction';
import { fetchAllTicketsForAdmin, filterSearchAdminTicket } from '../../features/ticketSlice/ticketAction';
import AdminTicketsTable from './tickets/AdminTicketsTable';
import UsersTable from './users/UsersTable';

function View() {

    const dispatch = useDispatch();

    const { tabSelected } = useSelector((state) => state.homeTabs);
    const {users: {users}} = useSelector ((state) => state.allUsers)
    const {adminTickets} = useSelector ((state) => state.tickets)


    useEffect(()=>{

        if(tabSelected === "Users"){
            //if no user found fetch users
            if(!users?.length){
                dispatch(getUsersData())
            }
        }
        if(tabSelected === "Tickets"){
            //if no user found fetch users    
            dispatch(fetchAllTicketsForAdmin())
        }


        console.log(users)
    },[users, dispatch, tabSelected]);


    const handleOnChange =(e)=>{
        const {value} = e.target;
        if(tabSelected === "Users"){
            dispatch(filterSearchUser(value))
        }
        else if(tabSelected === "Tickets"){
            dispatch(filterSearchAdminTicket())
        }
    }

    return (
        <div className="homeHeight w-[85%] text-black">
            
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-7">

                <div className="font-bold flex justify-center items-center">
                   {`${tabSelected}`} Database
                </div>
                <div className="text-gray-500 flex items-center justify-center border border-1 h-8 pl-2 space-x-2 cursor-pointer rounded-md">
                <AiOutlineSearch className />
                <input
                    type="text"
                    name="searchTicket"
                    onChange={handleOnChange}
                    //value={searchString}
                    placeholder="Search for user"
                    className="focus:outline-none flex items-center justify-center text-[13px]"
                    />
                </div>
            </div>

            {/* Table should be used with height of element */}
            {
                tabSelected === "Users"?
                <UsersTable/> : tabSelected === "Tickets" ? <AdminTicketsTable/> :<p>Nothing yet</p>
            }
        </div>
    )
}

export default View
import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { filterSearchUser, getUsersData } from '../../features/allUsersSlice/allUsersAction';
import UsersTable from './UsersTable';

function View() {

    const dispatch = useDispatch();

    const { tabSelected } = useSelector((state) => state.homeTabs);

    const {users: {users}} = useSelector ((state) => state.allUsers)

    useEffect(()=>{
        //if no user found fetch users
        if(!users?.length){
            dispatch(getUsersData())
        }
        console.log(users)
    },[users, dispatch]);


    const handleOnChange =(e)=>{
        const {value} = e.target;
        dispatch(filterSearchUser(value))
    }

    return (
        <div className="homeHeight w-[85%] text-black">
            
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-6">

                <div className="font-bold flex justify-center items-center">
                    All Users Database
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
            <UsersTable/>
        </div>
    )
}

export default View
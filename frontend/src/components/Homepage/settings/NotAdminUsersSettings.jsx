import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import UserEdit from '../../../pages/UserEdit';
import { VscAccount, VscCalendar, VscDeviceMobile, VscMail } from "react-icons/vsc";
import { ImHome } from "react-icons/im";
import moment from 'moment';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { getSelectedUserRefresh } from '../../../features/SpecificUerSlice/userSlice';
import Header from '../../Header';


function NotAdminUsersSettings() {

    const {user} = useSelector(state => state.user)
    const {selectedUser, selectedUserAfterEdit} = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()=>{
    },[])


    return (
        <div>
            <Header />
        <div className="flex
        items-center justify-center pt-24 ">

        <div className="flex flex-col sm:space-y-8 sm:space-x-12
        items-center justify-center ">
            <h1 className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[16px] sm:text-[30px] ">Settings</h1>
            
            {/* Info */}
            <div className=' text-black text-[12px] flex flex-col items-start justify-start boxShadow w-60 sm:w-[400px] h-72 pl-6 pt-8 sm:pt-5  space-y-4'>

                <div className='flex '>

                    <div className="flex items-center justify-center rounded-full bg-slate-300 w-10 h-10 text-[25px]"> {user?.name?.charAt(0).toUpperCase()}</div>

                    <div className='pl-2 flex flex-col'>
                        <h1 className=' text-[13px] font-bold'>{user.fullName}</h1>
                        <p>{user.department}</p>
                    </div>

                </div>
                
                
                <div className="space-y-5">

                    <div className='space-y-2'>
                        <h2 className='text-slate-400 text-[12px]'>Account Details</h2>
                        
                        <div className='space-y-2'>
                            <p className='flex space-x-2 items-center'>
                                <VscAccount/>
                                <span>{user.name}</span>
                            </p>

                            <p className='flex space-x-2 items-center'>
                                <VscCalendar/>
                                <span>{moment(user.dob).format("l")}</span>
                            </p>
                        </div>
                    </div>


                    <div className='space-y-2'>
                        <h2 className='text-slate-400 text-[12px]'>Contact Details</h2>

                        <div className='space-y-2'>
                            <p className='flex space-x-2 items-center'>
                                <VscDeviceMobile/>
                                <span>+1 {user.phone}</span>
                            </p>

                            <p className='flex space-x-2 items-center'>
                                <VscMail/>
                                <span>{user.email}</span>
                            </p>

                            <p className='flex space-x-2 items-center'>
                                <ImHome/>
                                <span>{user.address}</span>
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Button */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            onClick = {dispatch(getSelectedUserRefresh())}
            >
                <Link to={`/user_details/${user._id}`}>
                <button className='w-48 h-10 text-sm rounded-md bg-green-800 text-slate-200 shadow-lg'>
                    Edit your profile ?
                </button>
                </Link>
            </motion.div>
            

        </div>
        </div>
        </div>
            


        );
}

export default NotAdminUsersSettings
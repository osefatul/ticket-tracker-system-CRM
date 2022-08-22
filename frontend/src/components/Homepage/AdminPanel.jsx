import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import { getTabsSuccess } from '../../features/selectedHomeTabs/tabsSlice';


function AdminPanel() {
    const dispatch = useDispatch();


return (
<div>

<div className='space-y-5 flex flex-col items-center justify-center '>


    <div className='pt-10 sm:pt-16 space-y-4 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center'>
    
    
        <motion.div
        onClick={()=> dispatch(getTabsSuccess("Users"))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className=' cursor-pointer mt-4 p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

        <img className='w-[48px] h-[44px] sm:w-28 sm:h-24 bg-slate-700'  src="http://cdn.onlinewebfonts.com/svg/img_24830.png" alt="" />
        
        <p className=' text-slate-200 text-sm sm:text-md'>
        Ticket System Users
        </p>
        </motion.div>


        <motion.div
            onClick={()=> dispatch(getTabsSuccess("Tickets"))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className=' cursor-pointer  p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

            <img className='w-[44px] h-[44px] sm:w-24 sm:h-24 bg-slate-700'
            src="https://icon-library.com/images/list-icon-png/list-icon-png-10.jpg" alt="" />
            
            <p className='mt-1 text-slate-200  text-sm sm:text-md'>All Tickets</p>
        </motion.div>



        <motion.div
            onClick={()=> dispatch(getTabsSuccess("Settings"))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className=' cursor-pointer p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

            <img className='w-[44px] h-[44px] sm:w-24 sm:h-24 bg-slate-700' src="http://cdn.onlinewebfonts.com/svg/img_18912.png" alt="" />
            
            <p className='mt-1 text-slate-200 text-sm sm:text-md'>
            Settings
            </p>
        </motion.div>


</div>
</div>

</div>
)
}

export default AdminPanel
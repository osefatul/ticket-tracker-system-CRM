import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { motion } from "framer-motion"
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'


function DashboardUpdated() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(()=>{
    !user._id && setUser(JSON.parse(localStorage.getItem('user')));
  },[])


  return (
    <div>
    {user.isAdmin && <Header />}
      <div className="layout text-white">

        <div className='space-y-4 flex flex-col items-center justify-center pt-2 '>

          <h1 className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[16px] sm:text-[30px] ">Dashboard</h1>
          
          <Link to="/new_ticket">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button className=" text-[12px] border border-1 h-6 sm:h-10 px-3 rounded-md bg-green-800 hover:border hover:border-blue-500 shadow-lg ">
              Create New Ticket
            </button>
            </motion.div>
          </Link>
          
          
          <div className='pt-6 sm:pt-12 space-y-4 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center'>

            

            
            <Link to="/dept-ticket-lists">
              <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer mt-3 p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

              <img className='w-[44px] h-[42px] sm:w-24 sm:h-20 bg-slate-700'  src="https://icons-for-free.com/iconfiles/png/512/format+list+icon-1320183326433350365.png" alt="" />
              
              <p className=' text-slate-200 text-[12px] sm:text-[14px]'>
              Tickets assigned to your department
                </p>
            </motion.div>
            </Link>


            <Link to="/ticket-lists">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer  p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

                <img className='w-[44px] h-[42px] sm:w-24 sm:h-20 bg-slate-700'
                src="https://icon-library.com/images/management-icon/management-icon-5.jpg" alt="" />
                
                <p className='mt-1 text-slate-200 text-[12px] sm:text-[14px]'>
                  Tickets assigned to you</p>
            </motion.div>
            </Link>



            <Link to="/creator-ticket-lists">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

                <img className='w-[44px] h-[42px] sm:w-20 sm:h-20 bg-slate-700' src="https://cdn4.iconfinder.com/data/icons/social-media-1-1/66/54-512.png" alt="" />
                
                <p className='mt-1 text-slate-200 text-[12px] sm:text-[14px]'>
                Tickets created by you
                </p>
            </motion.div>
            </Link>


            <Link to="/resolved-tickets">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

                <img className='w-[44px] h-[42px] sm:w-20 sm:h-20 bg-slate-700' 
                src="https://img.icons8.com/ios/344/checklist--v1.png" alt="" />
                
                <p className='mt-1 text-slate-200 text-[12px] sm:text-[14px]'>
                Resolved Tickets
                </p>
            </motion.div>
            </Link>

            

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default DashboardUpdated
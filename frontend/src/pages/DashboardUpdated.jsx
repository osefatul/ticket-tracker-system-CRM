import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { motion } from "framer-motion"
import Footer from '../components/Footer'


const ticketsPath = [{i:0, path:"Tickets Assigned to our Dept"}, {i:1, path:"Tickets Assigned to Me"}, {i:2, path:"Tickets Assigned By Me"}]


function DashboardUpdated() {
  return (
    <div>
    <Header />
      <div className="layout text-white">

        <div className='space-y-5 flex flex-col items-center justify-center pt-5 '>

          <h1 className="font-bold text-black text-[32px] ">Dashboard</h1>
          
          <Link to="/new_ticket">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button className=" text-[14px] border border-1 h-10 px-3 rounded-lg bg-green-800 hover:border hover:border-blue-500 shadow-lg ">
              Create New Ticket
            </button>
            </motion.div>
          </Link>
          
          <div className='pt-10 sm:pt-20 space-y-4 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center'>
            {/* <Link> */}
            
              <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer mt-4 p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

              <img className='w-[44px] h-[44px] sm:w-24 sm:h-24 bg-slate-700'  src="https://icons-for-free.com/iconfiles/png/512/format+list+icon-1320183326433350365.png" alt="" />
              
              <p className=' text-slate-200 text-sm sm:text-md'>
              TIckets Assigned to our Dept
                </p>
            
            </motion.div>


            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer mt-4 p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

                <img className='w-[44px] h-[44px] sm:w-24 sm:h-24 bg-slate-700'
                src="https://icon-library.com/images/management-icon/management-icon-5.jpg" alt="" />
                
                <p className='mt-1 text-slate-200  text-sm sm:text-md'>Tickets Assigned to Me</p>

            </motion.div>


            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=' cursor-pointer mt-4 p-2 bg-slate-700 w-36 sm:w-44 h-22 sm:h-40 shadow-lg rounded-lg  flex flex-col items-center justify-center text-center text-white hover:border hover:border-red-500 shadow-lg'>

                <img className='w-[44px] h-[44px] sm:w-24 sm:h-24 bg-slate-700' src="https://cdn4.iconfinder.com/data/icons/social-media-1-1/66/54-512.png" alt="" />
                
                <p className='mt-1 text-slate-200 text-sm sm:text-md'>
                Tickets Assigned By Me
                </p>
            </motion.div>
            
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default DashboardUpdated
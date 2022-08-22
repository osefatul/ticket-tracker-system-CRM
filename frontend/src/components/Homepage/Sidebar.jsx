import React, { useState } from 'react'
import { HiX } from 'react-icons/hi';
import { HiMenuAlt4 } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getTabsSuccess } from '../../features/selectedHomeTabs/tabsSlice';
import { motion } from "framer-motion"

function Sidebar() {
    const [selectedTab, setSelectedTab] = useState()
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();


    const tabs = [
        {id:0, title:"Users"},
        {id:1, title:"Tickets"}, 
        {id:2, title:"Settings"}
    ]

    const handleSubmit = (index, title) =>{
    setSelectedTab(index)
    dispatch(getTabsSuccess(title))        
    }


    return (
    <div>

            {/* ICONS */}
        <div className=" sm:hidden h-[40px] relative flex items-center justify-center ]">
            {!toggle ? (
            <HiMenuAlt4
                className=" container z-30 text-slate-700 hover:text-[#519f8d] cursor-pointer mr-8 h-8 w-8"
                onClick={() => setToggle(!toggle)}
            />
            ) : (
            <div className="container z-50">
                <HiX
                className="hoverText ml-12 w-[20px] h-[20px] cursor-pointer text-slate-700"
                onClick={() => setToggle(false)}
                />
            </div>
            )}




            {/* SIDE BAR */}
            <div
            className={`fixed top-[50px] left-0 z-40 h-screen w-[20%] 
            flex flex-col justify-start items-start  
            bg-slate-200 ${
                toggle ? "translate-x-0" : "-translate-x-40"
            } ease-out duration-700  shadow-2xl`}
            >

            <div className='flex flex-col space-y-3 text-sm mt-16 w-full text-slate-700 '>
            {tabs.map((tab ,index)=>(
                
                <div key={index}
                className={`${index === selectedTab && " bg-slate-300 shadow-md border-r-4 border-blue-800"}  w-full h-8 flex items-center justify-start hover:bg-slate-300 hover:shadow-md px-2`}
                onClick={() => handleSubmit(index, tab.title)}
                >
                    <p className=" cursor-pointer">
                        {tab.title}
                    </p>
                </div>
            ))}
            </div>

            </div>
        </div>





        <div className='homeHeight bg-slate-200 hidden sm:flex text-black  '>

            <div className='flex flex-col space-y-5 text-sm '>
            {tabs.map((tab ,index)=>(
                
                <motion.div 
                key={index}
                
                className={`${index === selectedTab && " shadow-md border-r-4 border-blue-800 "} w-full h-8 flex items-center justify-start  sm:px-8 hover:bg-slate-300 hover:shadow-md ` }
                onClick={() => handleSubmit(index, tab.title)}
                >
                    <motion.p 
                    className=" cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9 }}
                    >
                        {tab.title}
                    </motion.p>
                </motion.div>
            ))}
            </div>
            
        </div>
    </div>
    )
}

export default Sidebar
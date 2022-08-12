import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTabsSuccess } from '../../features/selectedHomeTabs/tabsSlice';

function Sidebar() {
    const [selectedTab, setSelectedTab] = useState()
    const dispatch = useDispatch();


    const tabs = [
        {id:0, title:"Users"},
        {id:1, title:"Tickets"}, 
        {id:2, title:"Analytics"}
    ]

    const handleSubmit = (index, title) =>{
    setSelectedTab(index)
    dispatch(getTabsSuccess(title))        
    }


    return (
        <div className='homeHeight w-[15%] bg-[#ebedee] text-black flex flex-col px-10 space-y-3 items-start justify-start'>

            {tabs.map((tab ,index)=>(
                
                <div key={index}
                className={`${index === selectedTab && "text-orange-800"}`}
                onClick={() => handleSubmit(index, tab.title)}
                >
                    <p className=" cursor-pointer">
                        {tab.title}
                    </p>
                </div>
            ))}


        </div>
    )
}

export default Sidebar
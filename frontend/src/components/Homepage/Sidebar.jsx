import React, { useState } from 'react'

function Sidebar() {

    const [selected, setSelected] = useState(0)

    const tabs = [
        {id:0, title: 'Users'},
        {id:1, title:"Tickets"}, 
        {id:2, title:"Analytics"}]

    const {id, title} = tabs [selected]


    return (
        <div className='homeHeight w-[15%] bg-[#ebedee] text-black flex flex-col px-10 space-y-3 items-start justify-start'>

            {tabs.map((tab ,index)=>(
                
                <div key={index}
                className={`${index === selected && "text-orange-800"}`}
                onClick={()=> setSelected(index)}
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
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react'
import { setModalCloseSuccess } from '../../../features/modalSlice/CloseTicketModalSlice';
import AssignTicket from './AssignTicket';
import ResolveTicket from './ResolveTicket';
import ChangeStatus from './ChangeStatus';

function Modal ({tid}) {
    const dispatch = useDispatch()

    const modalTabs = [
        {
        id: 0,
        category: "Assign Ticket",
        details: " ",
        },
        {
        id: 1,
        category: "Change Status",
        details: " ",
            },
    ];

    const [value, setValue] = useState(0);
    const { id, category, details } = modalTabs[value];

    const handleOnSubmit = (e) =>{

    }
    
return (

<div className="h-screen w-screen top-0 right-0 left-0 z-50 fixed flex items-center justify-center bg-black bg-opacity-40 transition ease-out duration-300 text-slate-700">

    <div className=" h-[400px] inline-block align-bottom bg-white rounded-2xl text-left shadow-3xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        
            <div
                className="hoverAnimation w-5 h-5 fixed top-0 right-0 rounded bg-red-400 flex items-center justify-center"
                onClick={() => dispatch(setModalCloseSuccess())}
            >
                <span className="text-[12px] text-black font-bold cursor-pointer"> X </span>
            </div>


        <div className="flex flex-col px-4 pt-6 sm:px-6">

            {/* Modal Tabs */}
            <div className='flex items-center justify-center space-x-4 sm:space-x-10'>
                
                {modalTabs.map((item, index) => {
                return (
                <div
                    key={item.id}
                    onClick={() => setValue(index)}
                    className={`${index === value && "text-orange-800 border-b border-blue-500 shadow-md" } ${
                        index === value && "border-slate-500  "
                    }`}
                >
                    <h2 className="text-[12px] font-medium cursor-pointer">
                    {item.category}
                    </h2>
                </div>
                );
            })}
            </div>

            <div className="pt-6">
            {category === "Assign Ticket" ? (
            <AssignTicket details={details} tid={tid} />
            ) :
            <ChangeStatus details={details} tid ={tid} />
            }
            </div>
            
    
        </div>
    </div>
</div>
    

        )
}

export default Modal
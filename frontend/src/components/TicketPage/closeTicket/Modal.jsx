import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react'
import { setModalCloseSuccess } from '../../../features/modalSlice/CloseTicketModalSlice';

function Modal (ticketDetails, closeTicket, tid, children, onClick) {
    const dispatch = useDispatch()

    const handleOnSubmit = (e) =>{

    }
    
return (

<div className="h-screen w-screen top-0 right-0 left-0 z-50 fixed flex items-center justify-center bg-black bg-opacity-40 transition ease-out duration-300 ">
    <div className="inline-block align-bottom bg-white rounded-2xl text-left shadow-3xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        
        <div>
            <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 "
                onClick={() => dispatch(setModalCloseSuccess())}
            >
                <span className=" h-[22px] text-black cursor-pointer"> X </span>
            </div>
        </div>




        <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                    <div className="">
                        <div >
                            <button
                                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                type="submit"
                                onClick={handleOnSubmit}
                            >
                                Submit
                            </button>
                        </div>
            </div>
        </div>
    </div>
</div>
    

        )
}

export default Modal
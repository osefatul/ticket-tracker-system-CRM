import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpenFail, setModalOpenPending, setModalOpenSuccess } from '../../../features/modalSlice/CloseTicketModalSlice';
import Modal from './Modal';


function LunchResolveTicket({tid}) {
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.closeTicketModal)
    
    
    const handleOnSubmit = (e)=>{
        e.preventDefault();

        try {
            dispatch(setModalOpenSuccess())
        }catch (error){
            dispatch(setModalOpenFail())
        }
    }
    
return (
    <div className="text-[14px] w-20 flex items-center justify-center border border-1 h-8 px-3 rounded-md bg-green-800 shadow-lg text-slate-200 " >
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="save-button "
            onClick={handleOnSubmit}
        >
        Actions
        </motion.button>
        
        {modalOpen && <Modal tid={tid} />}
    
    </div>

    )
}

export default LunchResolveTicket
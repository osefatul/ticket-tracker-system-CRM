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
    <div className="border border-1 rounded-sm px-4 py-[2px] bg-slate-400 text-[12px] " >
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
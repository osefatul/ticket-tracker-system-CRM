import React from 'react'
import CloseBackDrop from './CloseBackDrop';
import { motion } from "framer-motion";

function CloseTicketModal({ handleClose, text }) {
  
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  



    return (
      <CloseBackDrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p>{text}</p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
      </CloseBackDrop>
    );
  };


export default CloseTicketModal
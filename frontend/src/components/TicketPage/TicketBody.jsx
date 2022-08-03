import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyOnTicket } from "../../features/ticketSlice/ticketAction";
import TicketConversation from "./TicketConversation";


function TicketBody({ details, _id, setMessageAddedAlert }) {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.user);
  const {name}= user;
  const [message, setMessage] = useState("")



  const handleOnChange = (e)=>{
    setMessage(e.target.value);
  }


  const handleOnSubmit = (e)=>{
    e.preventDefault();

    const msgObj = {
      message,
      sender: name
    };

    dispatch(replyOnTicket(_id, msgObj))
    // alert("Form submitted successfully")
    setMessageAddedAlert(true)
    setMessage("")


  }

  return (
    <div className="">
      <form onSubmit={handleOnSubmit}>
        
        <button type= 'submit' className="text-[10px] border bg-orange-600 p-[4px] my-4 rounded">Add Comment</button>
        <textarea
          rows="3"
          className={`placeholder:italic placeholder:text-slate-400 placeholder:pl-1
              block text-slate-700 bg-white rounded-md shadow-sm sm:text-sm
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 border border-slate-500 w-full text-[10px]
              }`
            }
          name="comment"
          value= {message}
          placeholder="Please add a comment"
          type="text"
          required
          onChange={handleOnChange}
        />
      </form>
      
      <div >
      <TicketConversation details={details} />
      </div>
      
    </div>
  );
}

export default TicketBody;

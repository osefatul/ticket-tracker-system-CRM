import React, { useEffect, useState } from "react";
import TicketSummary from "./TicketSummary";
import { userRows } from "../../dummyTickets";
import TicketBody from "./TicketBody";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTicket, closeTicket } from "../../features/ticketSlice/ticketAction";
import { resetResponseMsg } from "../../features/ticketSlice/ticketSlice";

import LunchResolveTicket from "./closeTicket/LunchResolveTicket";
import Modal from "./closeTicket/Modal";

function TicketOverviewAndSummary() {

  const { tid } = useParams(); //ticketID from the Ticket_communication page
  const dispatch = useDispatch();
  const[MessageAddedAlert, setMessageAddedAlert] = useState(false)

  const modalOpen = useSelector((state) => state.closeTicketModal);
  

  const {
		isLoading,
		error,
		selectedTicket,
		replyMsg,
		replyTicketError,
	} = useSelector(state => state.tickets);



  useEffect(()=>{
    setTimeout(()=>{
      setMessageAddedAlert(false);
    },5000)
  },[MessageAddedAlert])

  
  useEffect(() => {
    dispatch(fetchSingleTicket(tid))

    //return a function that will clean up the previous effect
    return ()=>{
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
    }
  }
  ,[dispatch, tid, replyMsg, replyTicketError, modalOpen])
  

  
  const tabs = [
    {
      id: 0,
      category: "Overview",
      details: selectedTicket,
    },
    { id: 1, 
      category: "Communication",  
      details: selectedTicket.conversations },
  ];
  
  

  const [value, setValue] = useState(0);
  const { id, category, details } = tabs[value];





  return (
    <div>
      
      {MessageAddedAlert && <div className=" bg-green-800 text-white text-small rounded flex items-center justify-center m-3">{replyMsg}</div>}

      <div>
        <div className="flex items-center justify-between p1-2 pb-2">
          <div className="flex space-x-3 flex justify-center items-center">
            <span className="bg-gray-300 w-6 rounded flex justify-center items-center">{selectedTicket.severity}</span>
          <h1 className="flex items-start justify-start font-semibold text-[18px]">
          {selectedTicket.title}
          </h1>
          </div >

          <LunchResolveTicket 
          ticketDetails= {selectedTicket} 
  
          />
        
        </div>
        <div className="flex items-center justify-start space-x-4">
          {tabs.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => setValue(index)}
                className={`${index === value && " text-orange-800"} ${
                  index === 1 && "border-l-2 border-slate-200 pl-4 "
                }`}
              >
                <h2 className="text-[13px] font-medium cursor-pointer">
                  {item.category}
                </h2>
              </div>
            );
          })}
        </div>
      </div>

      <div></div>

      <div>
        {category === "Overview" ? (
          <TicketSummary details={details} />
        ) : (
          <TicketBody details={details} _id= {tid} setMessageAddedAlert={setMessageAddedAlert} />
        )}
      </div>
    </div>
  );
}

export default TicketOverviewAndSummary;

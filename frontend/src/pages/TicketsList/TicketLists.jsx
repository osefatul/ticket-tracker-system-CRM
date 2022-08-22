import React, { useEffect, useState } from "react";
import PageBreadCrumbs from "../../components/PageBreadCrumbs";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import TicketsTable from "../../components/TicketsTable";

import {useDispatch, useSelector} from "react-redux";
import {fetchAllTicketsAssignedToAUser, filterSearchTicket} from "../../features/ticketSlice/ticketAction";
import { loginSuccess } from "../../features/authSlice/loginSlice";
import { fetchNewAccessJWT } from "../../api/userApi";
import TicketListsStatistics from "../../components/TicketListsStatistics";
import { resetTicketsList } from "../../features/ticketSlice/ticketSlice";
import NoTicketsList from "../../components/NoTicketsList";



function TicketLists() {
  
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);


  //fetch all tickets once when the page is loaded.
  useEffect(() => {
    dispatch(resetTicketsList());
    
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    }
    
    updateAccessJWT && dispatch (fetchAllTicketsAssignedToAUser())
  }, [dispatch]);

  
  const handleOnChange = (e) => {
    const {value} = e.target;
    dispatch(filterSearchTicket(value))
  };


  return (
    <>
      <Header />
      <div className="layout ">

        <PageBreadCrumbs page="Ticket Lists" />

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-6 ">

        <div className="text-slate-800 font-bold border-b border-amber-600 shadow-lg text-[16px] sm:text-[21px]">
                    Tickets assigned to you
          </div>
          
          <div className="flex flex-col">
                
              <div className="text-black py-4">
                    <TicketListsStatistics fetchFunction={fetchAllTicketsAssignedToAUser} />
                </div>

                <div className="text-gray-500 flex items-center justify-center border border-1 h-7 space-x-2 cursor-pointer rounded-md">
                    <AiOutlineSearch className />
                    <input
                    type="text"
                    name="searchTicket"
                    onChange={handleOnChange}
                    placeholder="Search for ticket"
                    className="focus:outline-none flex items-center justify-center text-[13px]"
                    />
                </div>
            </div>
        </div>

        { tickets.length > 0 ? <TicketsTable /> :
          <div>
          <NoTicketsList/>
          </div>
          }
      </div>

      <Footer />
    </>
  );
}

export default TicketLists;

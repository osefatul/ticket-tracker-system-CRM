import React, { useEffect, useState } from "react";
import PageBreadCrumbs from "../../components/PageBreadCrumbs";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import TicketsTable from "../../components/TicketsTable";

import {useDispatch} from "react-redux";
import {fetchAllTicketsAssignedToAUser, filterSearchTicket} from "../../features/ticketSlice/ticketAction";
import { loginSuccess } from "../../features/authSlice/loginSlice";
import { fetchNewAccessJWT } from "../../api/userApi";
import TicketListsStatistics from "../../components/TicketListsStatistics";



function TicketLists() {
  
  const dispatch = useDispatch();

  //fetch all tickets once when the page is loaded.
  useEffect(() => {
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

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-6 pt-4">

        <div className="text-md sm:text-lg font-bold text-black pb-3 sm:pb-0">
                    Tickets Assigned to Me:
          </div>
          
          <div className="flex flex-col">
                
                <div className="text-black pb-2">
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

        <TicketsTable />
      </div>

      <Footer />
    </>
  );
}

export default TicketLists;
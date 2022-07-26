import React, { useEffect, useState } from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import TicketsTable from "../components/TicketsTable";
import { Link } from "react-router-dom";

import {useDispatch} from "react-redux";
import {fetchAllTickets, filterSearchTicket} from "../features/ticketSlice/ticketAction";



function TicketLists() {
  
  const dispatch = useDispatch();

  //fetch all tickets once when the page is loaded.
  useEffect(() => {
    dispatch (fetchAllTickets())
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
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 pt-3">
          <Link to="/new_ticket">
            <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
              New Ticket
            </button>
          </Link>

          <div className="text-gray-500 flex items-center justify-center border border-1 h-8 pl-2 space-x-2 cursor-pointer rounded-md">
            <AiOutlineSearch className />
            <input
              type="text"
              name="searchTicket"
              onChange={handleOnChange}
              // value={searchString}
              placeholder="Search for ticket"
              className="focus:outline-none flex items-center justify-center text-[13px]"
            />
          </div>
        </div>

        <TicketsTable />
      </div>

      <Footer />
    </>
  );
}

export default TicketLists;

import React, { useEffect, useState } from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import TicketsTable from "../components/TicketsTable";
import { Link } from "react-router-dom";

import {useDispatch} from "react-redux";
import {fetchAllTicketsBySpecificUser, filterSearchTicket} from "../features/ticketSlice/ticketAction";
import { loginSuccess } from "../features/authSlice/loginSlice";
import { fetchNewAccessJWT } from "../api/userApi";



function TicketLists() {
  
  const dispatch = useDispatch();

  //fetch all tickets once when the page is loaded.
  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    }
    updateAccessJWT && dispatch (fetchAllTicketsBySpecificUser())
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

          <Link to="/new_ticket">
            <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
            Create New Ticket
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

import React, { useEffect, useState } from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
function TicketLists() {
  const [ticketString, setTicketString] = useState("");

  useEffect(() => {}, [ticketString]);

  const handleOnChange = (e) => {
    setTicketString(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <Header />
      <div className="layout pt-4">
        <PageBreadCrumbs page="Ticket Lists" />
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0">
          <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
            New Ticket
          </button>

          <div className="text-gray-500 flex items-center justify-center border border-1 h-8 pl-2 space-x-2 cursor-pointer rounded-md">
            <AiOutlineSearch className />
            <input
              type="text"
              name="searchTicket"
              onChange={handleOnChange}
              value={ticketString}
              placeholder="Search for ticket"
              className="focus:outline-none flex items-center justify-center text-[13px]"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TicketLists;

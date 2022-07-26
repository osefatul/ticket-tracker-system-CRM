import React, { useEffect } from "react";
import TicketsTable from "../components/TicketsTable";
import { Link } from "react-router-dom";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../features/ticketSlice/ticketAction";

// Dummy tickets
import { userRows } from "../dummyTickets";



function Dashboard() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);//from store.js

  useEffect(()=>{
    if (!tickets.length) {
      dispatch(fetchAllTickets())
    }
  },[tickets, dispatch]);


  return (
    <>
      <Header />
      <div className="layout">
        <div className="text-[12px]">
          <PageBreadCrumbs page="Dashboard" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0">
          <Link to="/new_ticket">
            <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
              New Ticket
            </button>
          </Link>

          <div className="text-black">
            <p>
              Total tickets: <span> 50</span>{" "}
            </p>
            <p>
              Pending tickets: <span> 9</span>{" "}
            </p>
            <p>
              Recently added tickets: <span> 9</span>{" "}
            </p>
          </div>
        </div>

        {/* Tickets Table */}
        <TicketsTable tickets={tickets}/>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;

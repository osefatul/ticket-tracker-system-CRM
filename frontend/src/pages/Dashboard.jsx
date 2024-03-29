import React, { useEffect } from "react";
import TicketsTable from "../components/TicketsTable";
import { Link } from "react-router-dom";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTicketsAssignedToAUser } from "../features/ticketSlice/ticketAction";
import moment from "moment";

// Dummy tickets
import { userRows } from "../dummyTickets";



function Dashboard() {

  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);//from store.js

  useEffect(()=>{
    if (!tickets.length) {
      dispatch(fetchAllTicketsAssignedToAUser())
    }
  },[tickets, dispatch]);



  const pendingTickets = tickets.filter((row) => row.status !== "Resolved");
  const totalTickets = tickets.length;
  
  const recentlyAddedTickets = tickets.filter((row) => {
    //Change the format to only hours and days
    const today = new Date();
    const todayHours = moment(today).format("HH")
    const todayDay = moment(today).format("DDD");

    const ticketHours =moment(row.openAt).format("HH")
    const ticketsDay = moment(row.openAt).format("DDD");

    return (todayDay === ticketsDay) && (todayHours - ticketHours< 2) 
    })


  return (
    <>
      <Header />
      <div className="layout">

        <div className="text-[12px]">
          <PageBreadCrumbs page="Dashboard" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0 px-0 md:px-6 pt-4">

          <Link to="/new_ticket">
            <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
              Create New Ticket
            </button>
          </Link>

          <div className="text-black w-34 flex flex-col">

            <div className="flex items-center justify-between ">
              <p className="">
              Total tickets:
              </p>
              <span className="pl-10"> {totalTickets}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <p>
                  Pending tickets: 
              </p>
              <span>{pendingTickets.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <p>
                  Recently added T:
              </p>
              <span> {recentlyAddedTickets.length}</span>
            </div>
          
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

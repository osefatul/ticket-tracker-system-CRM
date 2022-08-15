import React, { useEffect } from "react";
import TicketsTable from "../components/TicketsTable";
import { Link } from "react-router-dom";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTicketsAssignedToAUser } from "../features/ticketSlice/ticketAction";
import moment from "moment";

function TicketListsStatistics() {

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
    <div>TicketListsStatistics</div>
)
}

export default TicketListsStatistics
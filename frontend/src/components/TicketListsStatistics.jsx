import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";


function TicketListsStatistics({fetchFunction}) {

    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);//from store.js

    useEffect(()=>{
        if (!tickets.length) {
        dispatch(fetchFunction())
        }
    },[tickets, dispatch]);


    
    const pendingTickets = tickets.filter((row) => row.status === "Pending");
    const totalTickets = tickets.length;
    

    const recentlyAddedTickets = tickets.filter((row) => {

        //Change the format to only hours and days
        const today = new Date();
        const todayHours = moment(today).format("HH")
        // const todayDay = moment(today).format("DDD");
        const todayDay = new Date().toLocaleDateString()

        const ticketHours =moment(row.openAt).format("HH")
        // const ticketsDay = moment(row.openAt).format("DDD");
        const ticketsDay = new Date(row.openAt).toLocaleDateString()
    
        return (todayDay === ticketsDay) && (todayHours - ticketHours <= 2)
        })



    return (
    <div>

        <div className="text-black w-52 flex flex-col text-sm">

            <div className="flex items-center justify-between  ">
            <p className="">
            Total tickets:
            </p>
            <span className="pl-10"> {totalTickets}</span>
            </div>

            <div className="flex items-center justify-between">
            <p className="">
                Pending tickets: 
            </p>
            <span className="text-red-500" >{pendingTickets.length}</span>
            </div>

            <div className="flex items-center justify-between">
            <p className="">
                Recently added Tickets:
            </p>
            <span className="text-orange-400" > {recentlyAddedTickets.length}</span>
            </div>

        </div>

    </div>
)
}

export default TicketListsStatistics
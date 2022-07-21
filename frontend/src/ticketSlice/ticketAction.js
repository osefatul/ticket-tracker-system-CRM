import {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketFail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketFail,
} from "./ticketsSlice";


const fetchAllTickets = ()=> (dispatch)=>{
    dispatch(fetchTicketLoading());

    try {
        //
    }catch(error) {
        dispatch(fetchTicketFail(error.message));

    }

}
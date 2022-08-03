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
} from "./ticketSlice";


import {
    getAllTickets,
    getSingleTicket,
    updateReplyTicket,
    updateTicketStatusClosed,
} from "../../api/ticketApi";



export const fetchAllTickets = () => async (dispatch)=>{
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTickets();
        result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
    
    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}



export const filterSearchTicket = str => dispatch =>{
    dispatch(searchTickets(str));
}



export const fetchSingleTicket = (id) => async dispatch =>{
    dispatch(fetchSingleTicketLoading());
    try {
        const result = await getSingleTicket(id);
        dispatch(
            fetchSingleTicketSuccess(
            result.data.result
            )
        )
    
}catch (e) {
    dispatch(fetchSingleTicketFail(e.message));
}}



export const replyOnTicket = (id, msgObj) => async dispatch =>{
    dispatch(replyTicketLoading());
    try {
        const result = await updateReplyTicket(id, msgObj);
        // console.log(result);
        if(result.status === "error"){
            return dispatch(replyTicketFail(result.message));
        }
        // In order to show message added modal 
        dispatch(replyTicketSuccess(result.data.message));
        //If we don't fetchSingleTicket again the message we added wont be shown
        dispatch(fetchSingleTicket(id));
    }catch(error){
        console.log(error.message);
        dispatch(replyTicketFail(error.message));
    }
}





export const closeTicket = id => async (dispatch) => {
    dispatch(closeTicketLoading());
    try {
        const result = await updateTicketStatusClosed(id);

        if(result.status === "error"){
            return dispatch(closeTicketFail(result.message));
        }
        dispatch(fetchSingleTicket(id));
        dispatch(closeTicketSuccess("Status updated successfully"));
    }catch (e) {
    dispatch(closeTicketFail(e.message));
}}


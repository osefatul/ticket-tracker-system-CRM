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
} from "../api/ticketApi";


import axios from "axios";



export const fetchAllTickets = () => async (dispatch)=>{
    dispatch(fetchTicketLoading());
    try {
        const result = await axios ("http://localhost:5000/v1/ticket", {
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlZmF0MUBhbWF6b24uY29tIiwiaWF0IjoxNjU4NTMyMjYwLCJleHAiOjE2NTg1MzMxNjB9.oH5p1dOAo90QQ2_hP9z8GTlHFPyjbtrcUzFgmhtPx0U"
            }
        })

        // console.log(result)
        dispatch (fetchTicketSuccess(result.data.result))

        // const result = await getAllTickets();

        //data.result = this is an object we get in ticketRouter.js in the backend
        // result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
    
    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}



export const filterSearchTicket = str => dispatch =>{
    dispatch(searchTickets(str));
}



export const fetchSingleTicket = id => async dispatch =>{
    dispatch(fetchSingleTicketLoading());
    try {
        const result = await getSingleTicket(id);
        dispatch(
            fetchSingleTicketSuccess(
            result.data.result.length && result.data.result[0]
            )
        )
}catch (e) {
    dispatch(fetchSingleTicketFail(e.message));
}}



export const replyOnTicket = (id, msgObj) => async dispatch =>{
    dispatch(replyTicketLoading());
    try {
        const result = await updateReplyTicket(id, msgObj);
        console.log(result);
        if(result.status === "error"){
            return dispatch(replyTicketFail(result.message));
        }

        dispatch(fetchSingleTicket(id));
        dispatch(replyTicketSuccess(result.message));
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

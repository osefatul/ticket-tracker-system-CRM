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
    fetchAdminTicketSuccess,
    searchAdminTickets
} from "./ticketSlice";


import {
    
    getAllTicketsCreatedByAUser,
    getAllTicketsForAdmin,
    getAllTicketsToaDepartment,
    getAllTicketsToaSpecificUser,
    getSingleTicket,
    reAssignTicket,
    updateReplyTicket,
    updateTicketStatus,
} from "../../api/ticketApi";







//Get ALL TICKETS - ONLY ADMIN
export const fetchAllTicketsForAdmin = () => async (dispatch) =>{
    dispatch(fetchTicketLoading());
    try{
        const result = await getAllTicketsForAdmin();
        dispatch(fetchAdminTicketSuccess(result.data.tickets))

    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}


//GET TICKETS ASSIGNED TO A USER
export const fetchAllTicketsAssignedToAUser = () => async (dispatch)=>{
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTicketsToaSpecificUser();
        result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
    
    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}


//GET TICKETS ASSIGNED TO A USER
export const fetchTicketsAssignedToADepartment = () => async (dispatch)=>{
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTicketsToaDepartment();
        result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
    
    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}



//GET TICKETS ASSIGNED TO A USER
export const fetchTicketsCreatedByAUser = () => async (dispatch)=>{
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTicketsCreatedByAUser();
        result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
    
    }catch(error) {
        dispatch(fetchTicketFail(error.message));
    }
}







//GET TICKETS THAT ARE SEARCHED FOR
export const filterSearchTicket = str => dispatch =>{
    dispatch(searchTickets(str));
}


//GET TICKETS THAT ARE SEARCHED FOR IN THE ADMIN PAGE
export const filterSearchAdminTicket = str => dispatch =>{
    dispatch(searchAdminTickets(str));
}


//GET A SINGLE TICKET USING ITS ID
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



//RELY TO A TICKET OR PUSHING COMMENTS
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



//GET API TO SEND RE-ASSIGN TICKET
export const SendReAssignTicket = (id, ticketUpdates) => async dispatch => {
    try {
        const result = await reAssignTicket(id, ticketUpdates);
        console.log(result);

        dispatch(fetchSingleTicket(id))
    }catch (e) {
        console.log(e.message);
    }

}


//GET API TO UPDATE TICKET STATUS
export const SendTicketStatusUpdate = (id, ticketUpdates) => async (dispatch) => {
    dispatch(closeTicketLoading());
    try {
        const result = await updateTicketStatus(id, ticketUpdates);
        console.log(result);

        if(result.status === "error"){
            return dispatch(closeTicketFail(result.message));
        
        }
        dispatch(fetchSingleTicket(id));
        dispatch(closeTicketSuccess(result.data.message));
    }catch (e) {
    dispatch(closeTicketFail(e.message));
}}


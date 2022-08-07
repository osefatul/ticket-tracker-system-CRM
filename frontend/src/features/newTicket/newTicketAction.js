import {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
} from "./newTicketSlice";

import { createNewTicket } from "../../api/ticketApi";

export const openNewTicket = (formData) => async dispatch => {

    try {
        dispatch(openNewTicketPending())

        //call API
        const result = await createNewTicket(formData);
        if(result.status === "error"){
            return dispatch(openNewTicketFail(result.data.message));
        }
        dispatch(openNewTicketSuccess(result.data.message));
        
    }catch (error) {
        console.log(error);
        dispatch(openNewTicketFail(error.data.message));

    }
}
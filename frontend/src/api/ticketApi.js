import axios from "axios";

// Before hosting
// const rootUrl = "http://localhost:5000/v1";
// const ticketUlr = rootUrl + "/ticket/"
// const closeTicketUrl = ticketUlr + "status-update/";
// const reassignTicketUrl = ticketUlr + "assign-ticket/"
// const createdByAUserTicketUrl = ticketUlr + "tickets-creator/";
// const assignedToADeptTicketsUrl = ticketUlr + "department-tickets/";
// const getAllTicketsToaSpecificUserUrl = ticketUlr 


const rootUrl = "https://ticketing-crm.herokuapp.com/v1";
const ticketUlr = rootUrl + "/ticket/"
const closeTicketUrl = ticketUlr + "status-update/";
const reassignTicketUrl = ticketUlr + "assign-ticket/"
const createdByAUserTicketUrl = ticketUlr + "tickets-creator/";
const assignedToADeptTicketsUrl = ticketUlr + "department-tickets/";
const getAllTicketsToaSpecificUserUrl = ticketUlr 



//Create new ticket
export const createNewTicket  = async (formData)=>{
    console.log("from api", formData)
    try{
        const result =await axios.post(ticketUlr, formData, {
            headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
        console.log("ticket post", result)
        return result;
    }catch(e){
        return e;
    }
}


//Get all tickets for all users and departments - Admin only
export const getAllTicketsForAdmin = async ()=>{
    try{
        const result = await axios.get(ticketUlr + "tickets" , {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
                },
        })
        return result;
    }catch(e){
        return e;
    }
}



//Get all tickets Assigned to a specific users
export const getAllTicketsToaSpecificUser = async ()=>{
    try{
        // const result = await axios.get("http://localhost:5000/v1/ticket", {
        const result = await axios.get(getAllTicketsToaSpecificUserUrl, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
                },
        })
        return result;
    }catch(e){
        return e;
    }
}



//Get all tickets Assigned to a user Department
export const getAllTicketsToaDepartment = async ()=>{
    try{
        const result = await axios.get(assignedToADeptTicketsUrl, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
                },
        })
        return result;
    }catch(e){
        return e;
    }
}




// Get all tickets created by a user,
export const getAllTicketsCreatedByAUser = async ()=>{
    try {
        const result = await axios.get(createdByAUserTicketUrl ,
            {
                headers: {
                    Authorization: sessionStorage.getItem("accessJWT"),
                    },
            })
            return result;
        }catch(e){
            return e;
        }
}




// Get a single Ticket
export const getSingleTicket = async (id) => {
    try {
        const result = await axios.get(ticketUlr + id, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
        });
        return (result);
    } catch (error) {
        console.log(error.message);
        return(error);
    }

};



//Update conversations
export const updateReplyTicket = async (id, msgObj) => {
    try {
        const result = await axios.put(ticketUlr + id, msgObj, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
        });
        return (result);
    } catch (error) {
        console.log(error.message);
        return(error);
    }
};



//Update Ticket Status
export const reAssignTicket = async (id, ticketUpdates) => {
    try {
        const result = await axios.patch(reassignTicketUrl + id, ticketUpdates, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
        });
        return result;
    } catch (error) {
        console.log(error.message);
        return(error);
    }
};




//Update Ticket Status
export const updateTicketStatus = async (id, ticketUpdates) => {
    try {
        const result = await axios.patch(closeTicketUrl + id, ticketUpdates, {
        headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
        },
        });
        return result;
    } catch (error) {
        console.log(error.message);
        return(error);
    }
};




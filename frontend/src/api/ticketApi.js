import axios from "axios";

const rootUrl = "http://localhost:5000/v1";
const ticketUlr = rootUrl + "/ticket/"
const closeTicketUrl = ticketUlr + "close-ticket/";




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

//Get all tickets for all users and departments
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



//Get all tickets created by a specific users
export const getAllTicketsBySpecificUser = async ()=>{
    try{
        const result = await axios.get("http://localhost:5000/v1/ticket", {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
                },
        })
        return result;
    }catch(e){
        return e;
    }
}




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



export const updateTicketStatusClosed = async (id) => {
    try {
        const result = await axios.patch(closeTicketUrl + id, {}, {
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
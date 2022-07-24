import axios from "axios";

const rootUrl = "http://localhost:5000/v1";
const ticketUlr = rootUrl + "/ticket"
const closeTicketUrl = rootUrl + "ticket/close-ticket";




export const createNewTicket  = async (formData)=>{
    console.log("from api", formData)
    try{
        const result =await axios.post(ticketUlr, formData, {
            headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
        return result;
    }catch(e){
        return e;
    }
}



export const getAllTickets = async ()=>{
    try{
        const result = await axios.get("http://localhost:5000/v1/ticket", {
            headers: {
                Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlZmF0MUBhbWF6b24uY29tIiwiaWF0IjoxNjU4NjYyMTE5LCJleHAiOjE2NTg2NjQ1MTl9.-yC7yJOx1MklAAH7m_ofY6R6pZQ9qVni91sjaiJlnxE"
            }
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
            // Authorization: sessionStorage.getItem("accessJWT"),
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlZmF0MUBhbWF6b24uY29tIiwiaWF0IjoxNjU4NTMzMTAzLCJleHAiOjE2NTg1MzQwMDN9.g-N4iP_3PyhNCf9RbXze9McLsgpdoc-exnrsz6_cIsI"
        },
        });
        return (result);
    } catch (error) {
        console.log(error.message);
        return(error);
    }
};
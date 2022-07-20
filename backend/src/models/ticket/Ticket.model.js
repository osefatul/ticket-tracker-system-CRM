const { TicketSchema } = require("./Ticket.schema");


const createTicket = ticketObject =>{
    try {
    const savedTicket = TicketSchema(ticketObject).save()
    console.log(savedTicket);
    return savedTicket;
    } catch (error) {
    console.log(error);
    return (error);
    }
}

// Get all tickets for a specific user
const getTickets = clientId =>{
    try {
        const findTickets = TicketSchema.find({ clientId })
        return findTickets;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}


// Get tickets for a specific user
const getTicketById = (paramId, clientId) =>{
    try {
        const findTicket = TicketSchema.findOne({
            $and: [{_id:paramId}, { clientId: clientId}],
        });
        return findTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}


// Get tickets for a specific user
const updateTicketConversation = (paramId, message, sender) =>{
    try {
        const findTicket = TicketSchema.findOneAndUpdate(
            { paramId },
            {
            status: "Pending operator response",
            $push: {
                conversations: { message:message, sender:sender },
            },
            },
            { new: true }
        )
        return findTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}




//Close Ticket
const updatedStatusClose = (paramId, clientId, message)=>{

    try {
        const findTicket = TicketSchema.findOneAndUpdate(
        {
        $and: [{_id:paramId}, { clientId: clientId}],
        },
        {
        status: "Resolved",
        $push : {
            conversations:{message:message}
        }
        },
        { new: true }
        );

        return findTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}




module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketConversation,
    updatedStatusClose
}
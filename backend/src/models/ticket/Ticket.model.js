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

// Get tickets for a specific user
const getTickets = clientId =>{
    try {
        const findTicket = TicketSchema.find({ clientId })
        return findTicket;
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


module.exports = {
    createTicket,
    getTickets,
    getTicketById
}
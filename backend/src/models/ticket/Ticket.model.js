const { TicketSchema } = require("./Ticket.schema");


const createTicket = ticketObject =>{
    try {
    const savedTicket = TicketSchema(ticketObject).save()
    return savedTicket;
    } catch (error) {
    console.log(error);
    return (error);
    }
}


module.exports = {
    createTicket,
}
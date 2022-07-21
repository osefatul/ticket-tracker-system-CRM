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
const updateTicketConversation = (paramId, message) =>{
    try {
        const findTicket = TicketSchema.findOneAndUpdate(
            { paramId },
            {
            status: "Pending operator response",
            $push: {
                conversations: { message:message },
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

//Delete a ticket
const deleteTicket = async (paramId, clientId, res) => {
    try {
        //first find ticket
        const findTicket =  await TicketSchema.findOne({
            $and: [{_id:paramId}, { clientId: clientId}],
        });

        //if ticket is found in the DB then delete
        if(findTicket){
        const deleteTicket = await findTicket.deleteOne()
        return res.json({
            status: "success",
            message: "The ticket has been deleted",
            deleteTicket
        });
        }

        //if ticket not found in the DB then:
        return res.json({ status: 'error', message:"ticket is not found"}); 
    

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
    updatedStatusClose,
    deleteTicket
}
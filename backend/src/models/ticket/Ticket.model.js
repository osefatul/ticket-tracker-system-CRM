const {UserSchema} = require("../user/User.schema");
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


const getAllTicketsOfAllDepartments = async (user, res)=>{
    try {
        const adminUser = await UserSchema.findOne({_id:user});

        if(adminUser.isAdmin){
            const result = await TicketSchema.find();
            !result && res.status(404).json({ message: "Tickets not found" });
            
            return res.json({ status: "success", tickets: result, })
        }
    
        res.status(404).json({ message: "You are not allowed to access all tickets" });

    }catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error: " + error.message });
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
const updateTicketConversation = (_id, message, sender) =>{
    try {

        // const findTicket = TicketSchema.findOne({_id});

        // return findTicket
        const updateTicket = TicketSchema.findOneAndUpdate(
            {_id:_id},
            {
            status: "Pending operator response",
            $push: {
                conversations: { message, sender },
            },
            },
            { new: true }
        )
        return updateTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}


//Close Ticket
const updatedStatusClose = (paramId, clientId, message)=>{

    try {
        const closeTicket = TicketSchema.findOneAndUpdate(
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

        return closeTicket;
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
    getAllTicketsOfAllDepartments,
    getTickets,
    getTicketById,
    updateTicketConversation,
    updatedStatusClose,
    deleteTicket
}
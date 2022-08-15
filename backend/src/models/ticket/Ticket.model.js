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



//Get All tickets - Just for Admin only
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



// Get a list of all tickets assigned to a specific user
const getTickets = async clientId =>{
    try {
        //find who is logged in
        const findUser = await UserSchema.findOne ({_id: clientId})
        const {name, department} = findUser

        const findTickets = await TicketSchema.find({
            $and: [{assignee: name}, {department: department}] 
        })
        // console.log("This is tickets", findUser)
        return findTickets;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}


// Get a specific ticket  
const getTicketById = async (paramId, clientId) =>{
    try {
        
        // Follow below if want to make it private
        //find who is logged in
        // const findUser = await UserSchema.findOne ({_id: clientId})
        // const {name, department} = findUser

        // const findTicket = await TicketSchema.findOne({
        //     $and: [{_id:paramId}, { assignee: name}, { department: department}],
        // });

        const findTicket = await TicketSchema.findOne({
        _id:paramId
        });
        return findTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}




// Get a list of all tickets assigned to a specific user
const getTicketsCreator= async clientId =>{
    try {
        console.log("This is clientID:", clientId)
        //find who is logged in
        const findUser = await UserSchema.findOne ({_id: clientId})
        const {name, department} = findUser

        const findTickets = await TicketSchema.find({
            creator: name
        })

        return findTickets;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}





// Update conversation or push messages
const updateTicketConversation = (_id, message, sender) =>{
    try {

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






//Re-Assign Ticket
const reAssignTicket = async(paramId, req)=>{
    
    try {
        const {department, assignee, message, sender} = req.body;

        const updateTicket = await TicketSchema.findOneAndUpdate(
        {
        _id:paramId
        },
        {
        department: department,
        assignee: assignee,
        $push : {
            conversations:{message:message, sender:sender}
        }
        },
        { new: true }
        );


        return updateTicket;
    }
    catch (error) {
        console.log(error);
        return (error);
    }
}





//Update Ticket Status
const updatedStatus = async(paramId, req)=>{

    try {
        const {status, message, statusDetails,sender, severity }= req.body
        
        const closeTicket = await TicketSchema.findOneAndUpdate(
        {
            _id:paramId
        },
        {
        status: status,
        statusDetails: statusDetails,
        severity: severity,
        $push : {
            conversations:{message:message, sender: sender}
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
    updatedStatus,
    deleteTicket,
    reAssignTicket,
    getTicketsCreator
}
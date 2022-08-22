const express = require("express");
const router = express.Router();
const {userAuthorization,} = require("../middlewares/authorization.middleware");

const {
  createTicket, 
  getTickets, 
  getTicketById, 
  updateTicketConversation, 
  updatedStatus,
  deleteTicket,
  getAllTicketsOfAllDepartments, 
  reAssignTicket,
  getTicketsCreator,
  getTicketsForDepartment,
  getResolvedTicketsForDepartment
} = require("../models/ticket/Ticket.model")

const {
  createNewTicketValidation,
  replyTicketMessageValidation,
} = require("../middlewares/formValidation.middleware");
// const { getAllTickets } = require("../../../frontend/src/api/ticketApi");




//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });
  next();
});


//CREATE A NEW TICKET
router.post("/", createNewTicketValidation, userAuthorization, async (req, res) => {
    try {
      const { title, creator, severity, description, openAt, department, assignee, creatorDepartment } = req.body;
      const userId = req.userId;

      const ticketObj = {
        title,
        severity,
        description,
        openAt,
        creator,
        department,
        creatorDepartment,
        assignee,
      };
      
      const result = await createTicket(ticketObj);

      if (result._id) {
        return res.json({
          status: "success",
          message: "A new ticket has been created!",
        });
      }

      res.json({
        status: "error",
        message: "Unable to create the ticket , please try again later",
      });

    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);




//Get all tickets of all users and departments - This is for Admin
router.get("/tickets", userAuthorization, async (req, res) => {
  try {
    //find if user is isAdmin
    const userId = req.userId;
    await getAllTicketsOfAllDepartments(userId, res)

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})





// GET ALL TICKETS  CREATED By A USER
router.get("/tickets-creator", userAuthorization, async (req, res)=>{
  try {
    const userId = req.userId;
    const result = await getTicketsCreator(userId);

    // res.json(result.map(ticket=>ticket._id));
    if(result) 
    {return res.json({status: "success", result});}
  
    res.json({status: "success", message: "This user has no ticket"})

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})




// GET ALL TICKETS  ASSIGNED TO A SPECIFIC USER
router.get("/", userAuthorization, async (req, res)=>{
  try {
    const userId = req.userId;
    const result = await getTickets(userId);

    // res.json(result.map(ticket=>ticket._id));
    if(result) 
    {return res.json({status: "success", result});}
  
    res.json({status: "success", message: "This user has no ticket"})

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})



// GET ALL TICKETS  ASSIGNED TO A USER DEPARTMENT
router.get("/department-tickets", userAuthorization, async (req, res)=>{
  try {
    const userId = req.userId;
    const result = await getTicketsForDepartment(userId);

    // res.json(result.map(ticket=>ticket._id));
    if(result) 
    {return res.json({status: "success", result});}
  
    res.json({status: "success", message: "This user has no ticket"})

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})


// GET ALL RESOLVED TICKETS ASSIGNED TO A USER DEPARTMENT
router.get("/resolved-tickets", userAuthorization, async (req, res)=>{
  try {
    const userId = req.userId;
    const result = await getResolvedTicketsForDepartment(userId);

    // res.json(result.map(ticket=>ticket._id));
    if(result) 
    {return res.json({status: "success", result});}
  
    res.json({status: "success", message: "This user has no ticket"})

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})




//GET A SPECIFIC TICKET FOR A SPECIFIC USER
router.get('/:id',  async (req, res) => {
  try {
    
    const { id } = req.params;
    // const clientId = req.userId;

    const result = await getTicketById(id );
    if(result) return res.json({status: "success", result}); 

    res.json({status: "success", message: "This specific ticket is not in the user's list."});

  }catch (error) {
    res.json({ status: "error", message: error.message });
  }
})





//UPDATE REPLY MESSAGE FROM CLIENT
router.put("/:id", replyTicketMessageValidation, userAuthorization, async (req, res) => {

  try {
    const {message, sender} = req.body; 
    const { id } = req.params;
    const userId = req.userId;

    const result = await updateTicketConversation(id, message, sender);

    if (result._id) {
      return res.json({
        status: "success",
        message: "your message updated",
        result
      }, );
    }
    res.json({
      status: "error",
      message: "Unable to update your message please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
}
);



//RE-ASSIGN TICKET TO ANOTHER DEPARTMENT AND USER
router.patch("/assign-ticket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reAssignTicket( id, req );

    console.log(result);

    if (result) {
      return res.json({
        status: "success",
        message: "The ticket is assigned to another user successfully",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



// UPDATE TICKET STATUS
router.patch("/status-update/:id", userAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updatedStatus( id, req );
    console.log(result);

    if (result) {
      return res.json({
        status: "success",
        message: "The ticket status has been updated successfully",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



// DELETE TICKET
router.delete("/:id", userAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.userId;

  await deleteTicket( id, clientId, res );

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});












module.exports = router;
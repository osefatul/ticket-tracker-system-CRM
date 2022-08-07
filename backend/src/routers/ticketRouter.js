const express = require("express");
const router = express.Router();
const {userAuthorization,} = require("../middlewares/authorization.middleware");
const {createTicket, getTickets, getTicketById, updateTicketConversation, updatedStatusClose, deleteTicket} = require("../models/ticket/Ticket.model")

const {
  createNewTicketValidation,
  replyTicketMessageValidation,
} = require("../middlewares/formValidation.middleware");




//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });
  next();
});


//CREATE A NEW TICKET
router.post("/", createNewTicketValidation, userAuthorization, async (req, res) => {
    try {
      const { title, sender, severity, description, openAt } = req.body;
      const userId = req.userId;

      const ticketObj = {
        clientId: userId,
        title,
        severity,
        description,
        openAt,
        // conversations: [{sender}],
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



// GET ALL TICKETS FOR A SPECIFIC USER
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



//GET A SPECIFIC TICKET FOR A SPECIFIC USER
router.get('/:id', userAuthorization, async (req, res) => {
  try {
    const { id } = req.params;

    const clientId = req.userId;
    const result = await getTicketById(id, clientId);

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



// UPDATE TICKET STATUS
router.patch("/close-ticket/:id", userAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = req.userId;
    const {message} = req.body;

    const result = await updatedStatusClose( id, clientId, message );

    console.log(result);

    if (result) {
      return res.json({
        status: "success",
        message: "The ticket has been resolved successfully",
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
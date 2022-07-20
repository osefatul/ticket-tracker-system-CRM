const express = require("express");
const router = express.Router();
const {userAuthorization,} = require("../middlewares/authorization.middleware");
const {createTicket, getTickets, getTicketById, updateTicketConversation} = require("../models/ticket/Ticket.model")

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
      const { title, sender, severity, description } = req.body;
      const userId = req.userId;

      const ticketObj = {
        clientId: userId,
        title,
        severity,
        description,
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

    return res.json({status: "success", result});
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

    return res.json({status: "success", result});
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



router.get("/", (req, res) => {
  res.status(200).json(req.body);
});

module.exports = router;
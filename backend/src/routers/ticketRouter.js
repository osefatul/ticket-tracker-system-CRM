const express = require("express");
const router = express.Router();
const {userAuthorization,} = require("../middlewares/authorization.middleware");
const {createTicket} = require("../models/ticket/Ticket.model")


//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });
  next();
});


//CREATE A NEW TICKET
router.post(
  "/", async (req, res) => {
    try {
      const { title, sender, message, severity } = req.body;

      const userId = req.userId;

      const ticketObj = {
        clientId: userId,
        title,
        severity,
        conversations: [
          {
            sender,
            message,
          },
        ],
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




router.get("/", (req, res) => {
  res.status(200).json(req.body);
});

module.exports = router;
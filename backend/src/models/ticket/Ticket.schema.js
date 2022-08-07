const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We are adding virtual, because mongodb "id" along with "_id".
const opts = { toJSON: { virtuals: true } };

const TicketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "Pending operator response",
  },
  severity : {
    type: Number,
    required: true,
    default: 5,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true,
    default: "",
  },
  creator: {
    type: String,
    maxlength: 50,
    required: true,
    default: "",
  },
  conversations: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        // required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        // required: true,
        default: Date.now(),
      },
    },
  ],
}, opts);

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
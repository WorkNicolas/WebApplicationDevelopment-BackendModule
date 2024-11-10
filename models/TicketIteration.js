const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketIterationSchema = new Schema(
    {
        ticketID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true
        },
        username: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        comment: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("TicketIteration", TicketIterationSchema);
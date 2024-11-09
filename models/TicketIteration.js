const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketIterationSchema = new Schema(
    {
        ticketID: {
            type: mongoose.Schema.Types.ObjectId,
            required: "Ticket ID is required."
        },
        username: {
            type: String,
            required: "Username is required."
        },
        timestamp: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        status: {
            type: String,
            default: 'NEW',
            enum: ['NEW', 'In Progress', 'Dispatched', 'Closed', 'Cancelled'],
        },
        comment: {
            type: String,
            required: "Comment is required."
        }
    }
)
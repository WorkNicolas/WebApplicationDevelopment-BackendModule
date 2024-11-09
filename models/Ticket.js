const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priorityEnum = ['Low', 'Medium', 'High'];

const TicketSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: priorityEnum,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            default: 'NEW',
            enum: ['NEW', 'In Progress', 'Dispatched', 'Closed', 'Cancelled'],
        },
        resolution: String,
        created: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updated: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
    },
    {
        collection: "tickets",
    }
)

module.exports = mongoose.model("Ticket", TicketSchema);
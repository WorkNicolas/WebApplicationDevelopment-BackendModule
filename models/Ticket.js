/**
 * Ticket schema for MongoDB using Mongoose.
 *
 * @module TicketModel
 * @version 1.0.0
 * @date 2024-11-10
 * @description Defines the schema for the `Ticket` model, representing a support ticket in the application. It includes fields for ticket description, priority, user ID, status, resolution, and timestamps for creation and updates.
 * @author Carl Nicolas Mendoza
 */

/**
 * @requires mongoose
 * @requires Schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} Ticket
 * @property {string} description - A brief description of the ticket. (required)
 * @property {string} priority - The priority level of the ticket. (required, one of 'Low', 'Medium', 'High')
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the ticket. (required, references User model)
 * @property {string} status - The current status of the ticket. (default 'NEW', one of 'NEW', 'In Progress', 'Dispatched', 'Closed', 'Cancelled')
 * @property {string} [resolution] - The resolution or solution to the ticket.
 * @property {Date} created - The date and time when the ticket was created. (immutable, default: current date)
 * @property {Date} updated - The date and time when the ticket was last updated. (default: current date)
 * @property {boolean} timestamps - Automatically adds `createdAt` and `updatedAt` fields.
 */
const TicketSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ['Low', 'Medium', 'High']
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
        resolution: String
    },
    {
        timestamps: true,
    },
    {
        collection: "tickets",
    }
)

module.exports = mongoose.model("Ticket", TicketSchema);

/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * TicketIteration schema for MongoDB using Mongoose.
 *
 * @module TicketIterationModel
 * @version 1.0.0
 * @date 2024-11-08
 * @description Defines the schema for the `TicketIteration` model, representing iterations or updates to a ticket. Each iteration includes the ticket ID, the username of the user who made the update, a timestamp, and the comment related to the update.
 * @author Carl Nicolas Mendoza
 */

/**
 * @requires mongoose
 * @requires Schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} TicketIteration
 * @property {mongoose.Schema.Types.ObjectId} ticketID - The ID of the associated ticket. (required, references `Ticket` model)
 * @property {string} username - The username of the person who made the update to the ticket. (required)
 * @property {Date} timestamp - The timestamp of when the iteration was created. (default: current date, immutable)
 * @property {string} comment - The comment or update provided by the user. (required)
 */
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

// Export the model
module.exports = mongoose.model("TicketIteration", TicketIterationSchema);

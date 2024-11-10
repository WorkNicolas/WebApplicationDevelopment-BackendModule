const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');

// Function to generate a record number based on the date and sequence
async function generateRecordNumber() {
    const today = moment().format('YYYYMMDD'); // Get today's date in YYYYMMDD format

    // Find the latest ticket created today
    const lastTicket = await mongoose.model('Ticket').findOne({
        recordNumber: new RegExp(`^${today}-`), // Match tickets with today's date prefix
    }).sort({ recordNumber: -1 }); // Sort in descending order to get the last ticket

    // Generate the new sequence number
    let sequenceNumber = 1;
    if (lastTicket) {
        const lastSequence = parseInt(lastTicket.recordNumber.split('-')[1], 10);
        sequenceNumber = lastSequence + 1;
    }

    // Return the new record number
    return `${today}-${String(sequenceNumber).padStart(7, '0')}`; // Format as YYYYMMDD-0000001
}

/**
 * Ticket schema for MongoDB using Mongoose.
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
        resolution: String,
        recordNumber: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    },
    {
        collection: "tickets",
    }
);

// Pre-save hook to generate and set recordNumber before saving
TicketSchema.pre('save', async function(next) {
    if (!this.recordNumber) {
        try {
            // Generate the recordNumber asynchronously and set it
            this.recordNumber = await generateRecordNumber();
        } catch (error) {
            return next(error); // Pass any error that occurred
        }
    }
    next(); // Continue with save operation
});

module.exports = mongoose.model("Ticket", TicketSchema);

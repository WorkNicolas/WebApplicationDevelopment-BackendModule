const mongoose = require("mongoose");

/**
 * Ticket controller for managing tickets in the system.
 *
 * @module TicketController
 * @version 1.0.0
 * @date 2024-11-08
 * @description Defines various CRUD operations (Create, Read, Update, Delete) for handling tickets in the system, including ticket creation, retrieval, update, and deletion.
 * @author Carl Nicolas Mendoza
 */

/** 
 * @requires TicketModel - for performing database operations on tickets
 */
const TicketModel = require("../models/Ticket");

/**
 * Creates a new ticket and saves it in the database.
 * 
 * @function create
 * @async
 * @description This function instantiates a new ticket using the request body, then saves it in the database. If successful, it sends a success message as the response.
 * @param {Object} req - The request object, which contains the ticket data in the body.
 * @param {Object} res - The response object, which sends the success message if the ticket is created successfully.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue saving the ticket to the database.
 * @returns {Object} A JSON response with a success message upon successful ticket creation.
 */
module.exports.create = async function (req, res, next) {
    try {
        // Generate the ticket number
        let newTicket = new TicketModel({
            ...req.body,
            recordNumber: await generateTicketNumber(),
        })

        let result = await TicketModel.create(newTicket);
        res.json({
            success: true,
            message: "Ticket created successfully.",
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Ticket Number Generator
async function generateTicketNumber() {
    // Get today's date in the format YYYYMMDD
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');

    // Find the latest ticket number for the current day
    const latestTicket = await TicketModel.findOne({
        recordNumber: { $regex: `^${dateStr}-` }
    }).sort({ recordNumber: -1 });
    
    // Generate the next sequence number
    let sequence = 1;
    if (latestTicket) {
        const lastTicketNumber = latestTicket.recordNumber.split('-')[1];
        sequence = parseInt(lastTicketNumber, 10) + 1;
    }

    // Format the sequence to ensure it is always 7 digits (e.g. 0000001)
    const ticketNumber = `${dateStr}-${String(sequence).padStart(7, '0')}`;
    console.log('Ticket Number: ' + ticketNumber);
    return ticketNumber;
}

/**
 * Lists all tickets in the database.
 * 
 * @function list
 * @async
 * @description Retrieves all tickets from the database and sends them as the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object, which sends the list of tickets.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue retrieving the tickets from the database.
 * @returns {Object} A JSON response containing the list of tickets.
 */
module.exports.list = async function (req, res, next) {
    try {
        let list = await TicketModel.find({});

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Retrieves a ticket from the database by its ID and assigns it to `req.ticket`.
 * 
 * @function ticketGet
 * @async
 * @description This function is a middleware that retrieves a specific ticket based on the provided ticket ID from the request parameters. The ticket is assigned to `req.ticket` for further use.
 * @param {Object} req - The request object, which contains the ticket ID in the parameters.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function to call if the ticket is found.
 * 
 * @throws {Error} If the ticket is not found in the database.
 * @returns {undefined} The ticket is attached to `req.ticket` for further use.
 */
module.exports.ticketGet = async function (req, res, next) {
    try {
        let uID = req.params.ticketID;

        req.ticket = await TicketModel.findOne({ _id: uID });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Sends the details of a specific ticket.
 * 
 * @function ticketByID
 * @description This function sends the details of the ticket attached to `req.ticket` as the response.
 * @param {Object} req - The request object, which contains the ticket attached to `req.ticket`.
 * @param {Object} res - The response object, which sends the ticket data.
 * @param {function} next - The next middleware function to call.
 * 
 * @returns {Object} A JSON response containing the ticket details.
 */
module.exports.ticketByID = async function (req, res, next) {
    try {
        let uID = new mongoose.Types.ObjectId(req.params.ticketID);

        let result = await TicketModel.aggregate([
            {
                $match: { _id: uID }
            },
            {
                $lookup: {
                    from: "ticketiterations", // The collection name in MongoDB
                    localField: "_id",
                    foreignField: "ticketID",
                    as: "iterations"
                }
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "userId", 
                    foreignField: "_id", 
                    as: "userDetails"
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Updates an existing ticket in the database.
 * 
 * @function update
 * @async
 * @description This function updates an existing ticket with the provided data in the request body. It checks if the ticket exists, whether it's in a "Closed" status (in which case it cannot be updated), and whether the update was successful.
 * @param {Object} req - The request object, which contains the ticket ID in the parameters and the updated data in the body.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the ticket does not exist, the status is "Closed", or if the update fails.
 * @returns {Object} A JSON response with a success message if the ticket is updated, or an error message if the update fails.
 */
module.exports.update = async function (req, res, next) {
    try {
        let uID = req.params.ticketID;

        let updateTicket = new TicketModel(req.body);
        updateTicket._id = uID;

        let result = await TicketModel.updateOne({ _id: uID }, updateTicket);
        
        // Make sure that the ticket actually exists
        const existingTicket = await TicketModel.findById(uID);
        if (!existingTicket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found."
            });
        }

        // Check if status is "Closed"
        if (existingTicket.status === "Closed") {
            return res.status(400).json({
                success: false,
                message: "Cannot update a closed ticket."
            });
        }
        
        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket updated successfully.",
            })
        } else {
            // Express will catch this on its own.
            throw new Error("Ticket not updated. Are you sure it exists?");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Deletes a specific ticket by its ID.
 * 
 * @function remove
 * @async
 * @description This function deletes a ticket from the database by its ID. It checks if the deletion was successful and sends an appropriate response.
 * @param {Object} req - The request object, which contains the ticket ID in the parameters.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the ticket does not exist or if the deletion fails.
 * @returns {Object} A JSON response with a success message if the ticket is deleted successfully, or an error message if the deletion fails.
 */
module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.ticketID;

        let result = await TicketModel.deleteOne({ _id: uID });

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Ticket deleted successfully.",
            });
        } else {
            // Express will catch this on its own
            throw new Error("Ticket not deleted. Are you sure it exists?");
        } 
    } catch (error) {
        console.log(error);
        next(error);
    }
}

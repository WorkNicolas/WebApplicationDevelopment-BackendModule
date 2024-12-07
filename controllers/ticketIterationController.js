/**
 * Ticket Iteration controller for managing ticket iterations in the system.
 *
 * @module TicketIterationController
 * @version 1.0.0
 * @date 2024-11-10
 * @description Defines various CRUD operations (Create, Read, Update, Delete) for managing ticket iterations.
 * @author Carl Nicolas Mendoza
 */

/** 
 * @requires TicketIterationModel - for performing database operations on ticket iterations
 * @requires TicketModel - for checking the existence and status of related tickets
 */
const TicketIterationModel = require("../models/TicketIteration");
const TicketModel = require('../models/Ticket');

/**
 * Creates a new ticket iteration and associates it with an existing ticket.
 * 
 * @function create
 * @async
 * @description This function creates a new ticket iteration using the request body. It checks if the related ticket exists before proceeding with the creation. If the ticket does not exist, it responds with an error.
 * @param {Object} req - The request object, which contains the ticket iteration data in the body.
 * @param {Object} res - The response object, which sends a success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue creating the ticket iteration or if the related ticket does not exist.
 * @returns {Object} A JSON response with a success message if the ticket iteration is created successfully, or an error message if the related ticket does not exist.
 */
module.exports.create = async function (req, res, next) {
    try {
        let result = await TicketIterationModel.create(req.body);

        // Make sure that the ticket exists before creating ticket iteration
        const ticketExists = await TicketModel.exists({ _id: req.body.ticketID });
        if (!ticketExists) {
            return res.status(404).json({
                success: false,
                message: "Ticket ID does not exist.",
            });
        }
        res.json({
            success: true,
            message: "Ticket Iteration created successfully.",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Lists all ticket iterations in the database.
 * 
 * @function list
 * @async
 * @description Retrieves all ticket iterations from the database and sends them as the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object, which sends the list of ticket iterations.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue retrieving the ticket iterations from the database.
 * @returns {Object} A JSON response containing the list of ticket iterations.
 */
module.exports.list = async function (req, res, next) {
    try {
        let list = await TicketIterationModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Retrieves a specific ticket iteration by its ID and assigns it to `req.ticketIteration`.
 * 
 * @function ticketIterationGet
 * @async
 * @description This function is a middleware that retrieves a specific ticket iteration based on the provided ticket iteration ID from the request parameters. The ticket iteration is assigned to `req.ticketIteration` for further use.
 * @param {Object} req - The request object, which contains the ticket iteration ID in the parameters.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function to call if the ticket iteration is found.
 * 
 * @throws {Error} If the ticket iteration is not found in the database.
 * @returns {undefined} The ticket iteration is attached to `req.ticketIteration` for further use.
 */
module.exports.ticketIterationGet = async function (req, res, next) {
    try {
        let uID = req.params.ticketIterationID;
        req.ticketIteration = await TicketIterationModel.findOne({ _id: uID });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Sends the details of a specific ticket iteration.
 * 
 * @function ticketIterationById
 * @description This function sends the details of the ticket iteration attached to `req.ticketIteration` as the response.
 * @param {Object} req - The request object, which contains the ticket iteration attached to `req.ticketIteration`.
 * @param {Object} res - The response object, which sends the ticket iteration data.
 * @param {function} next - The next middleware function to call.
 * 
 * @returns {Object} A JSON response containing the ticket iteration details.
 */
module.exports.ticketIterationById = async function (req, res, next) {
    res.json(req.ticketIteration);
};

/**
 * Updates an existing ticket iteration.
 * 
 * @function update
 * @async
 * @description This function updates an existing ticket iteration with the provided data in the request body. It checks if the ticket iteration and its related ticket exist, and ensures that the ticket is not closed before proceeding with the update.
 * @param {Object} req - The request object, which contains the ticket iteration ID in the parameters and the updated data in the body.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the ticket iteration or the related ticket is not found, or if the ticket is closed and the iteration cannot be updated.
 * @returns {Object} A JSON response with a success message if the ticket iteration is updated, or an error message if the update fails.
 */
module.exports.update = async function (req, res, next) {
    try {
        let uID = req.params.ticketIterationID;
        let result = await TicketIterationModel.updateOne(
            { _id: uID },
            { $set: req.body }
        );

        // This is where we will get the ticket ID from the iteration
        const iteration = await TicketIterationModel.findById(uID);
        if (!iteration) {
            return res.status(404).json({
                success: false,
                message: "Ticket Iteration not found."
            });
        }
        console.log(iteration);
        console.log('Ticket ID from iteration:', iteration.ticketID);

        // Check the status of the related ticket using iteration
        const ticket = await TicketModel.findById(iteration.ticketID);
        console.log(ticket);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Related Ticket not found."
            });
        }

        // Ticket iterations of closed tickets cannot be updated
        if (ticket.status === "Closed") {
            return res.status(400).json({
                success: false,
                message: "Cannot update iteration for a closed ticket."
            });
        }

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket Iteration updated successfully.",
            });
        } else {
            throw new Error("Ticket Iteration not updated. Are you sure it exists?");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * Deletes a specific ticket iteration by its ID.
 * 
 * @function remove
 * @async
 * @description This function deletes a ticket iteration from the database by its ID. It checks if the deletion was successful and sends an appropriate response.
 * @param {Object} req - The request object, which contains the ticket iteration ID in the parameters.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the ticket iteration does not exist or if the deletion fails.
 * @returns {Object} A JSON response with a success message if the ticket iteration is deleted successfully, or an error message if the deletion fails.
 */
module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.ticketIterationID;
        let result = await TicketIterationModel.deleteOne({ _id: uID });

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Ticket Iteration deleted successfully.",
            });
        } else {
            throw new Error("Ticket Iteration not deleted. Are you sure it exists?");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

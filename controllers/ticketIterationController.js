const TicketIterationModel = require("../models/TicketIteration");
const TicketModel = require('../models/Ticket');

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

module.exports.list = async function (req, res, next) {
    try {
        let list = await TicketIterationModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

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

module.exports.ticketIterationById = async function (req, res, next) {
    res.json(req.ticketIteration);
};

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

        // Check the status of the related ticket using iteration
        const ticket = await TicketModel.findById(iteration.ticketID);
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

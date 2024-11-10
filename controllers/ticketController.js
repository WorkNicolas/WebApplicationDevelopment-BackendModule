

const TicketModel = require("../models/Ticket");

/*
create: Creates a new ticket by instantiating a TicketModel with the request body
then saves it in the database. Responds with a success message if creation succeeds.
*/
module.exports.create = async function (req, res, next) {
    try {
        let newTicket = new TicketModel(req.body)

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

module.exports.list = async function (req, res, next) {
    try {
        let list = await TicketModel.find({});

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

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

module.exports.ticketByID = async function (req, res, next) {
    res.json(req.ticket);
};

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

module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.ticketID

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
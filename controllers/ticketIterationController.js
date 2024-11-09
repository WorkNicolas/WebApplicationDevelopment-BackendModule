const TicketIterationModel = require("..models/TicketIteration");

module.exports.create = async function (req, res, next) {
    try {
        let newTicketIteration = new TicketIterationModel(req.body)

        let result = await TicketIterationModel.create(newTicketIteration);
        res.json( {
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

        req.ticketIteration = await TicketIterationModel.findOne({ _id: uID});
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
        let uID = req.params.ticketID;

        let updateTicketIteration = TicketIterationModel(req.body);
        updateTicketIteration._id = uID;

        let result = await TicketIterationModel.updateOne({ _id: uID, updateTicketIteration });

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket Iteration updated successfully.",
            })
        } else {
            // Express will catch this on its own.
            throw new Error("Ticket Iteration not updated. Are you sure it exists?");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.ticketIterationID

        let result = await TicketIterationModelModel.deleteOne({ _id: uID });

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Ticket Iteration deleted successfully.",
            });
        } else {
            // Express will catch this on its own
            throw new Error("Ticket Iteration not deleted. Are you sure it exists?");
        } 
    } catch (error) {
        console.log(error);
        next(error);
    };
/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * Router for handling ticket iteration-related routes.
 * 
 * @module TicketIterationRouter
 * @version 1.0.0
 * @date 2024-11-08
 * @description Defines routes for managing ticket iterations in the application.
 * @author Carl Nicolas Mendoza
 * 
 * @requires express - for creating the router and handling HTTP requests.
 * @requires ticketIterationController - controller containing the logic for handling ticket iteration operations.
 * @requires authController - controller responsible for authentication and authorization checks.
 */
const express = require('express');
const router = express.Router();
const ticketIterationController = require('../controllers/ticketIterationController');
const authController = require("../controllers/authController");
/**
 * Handles the GET request for the base `/` route of ticket iterations.
 * 
 * @function GET /
 * @description This route responds with a generic message about the ticket iteration resource.
 * @param {Object} req - The request object, which contains data for the incoming HTTP request.
 * @param {Object} res - The response object, which is used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Responds with a message indicating the ticket iteration resource.
 */
router.get("/", function (req, res, next) {
  res.send("Respond with a ticket iteration resource");
});

/**
 * Handles the POST request for creating a new ticket iteration.
 * 
 * @function POST /create
 * @description This route handles the creation of a new ticket iteration, requiring the user to be signed in.
 * @param {Object} req - The request object, containing the data for creating the ticket iteration.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Calls the `create` method in the `ticketIterationController` to create a new iteration.
 */
router.post('/create', authController.requireSignin, ticketIterationController.create);

/**
 * Handles the GET request to list all ticket iterations.
 * 
 * @function GET /list
 * @description This route fetches and lists all ticket iterations, requiring the user to be signed in.
 * @param {Object} req - The request object, which contains any necessary parameters for the request.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Calls the `list` method in the `ticketIterationController` to get and list ticket iterations.
 */
//router.get('/list', authController.requireSignin, ticketIterationController.list);
router.get('/list',  authController.requireSignin, ticketIterationController.list);

/**
 * Handles the GET request for fetching a specific ticket iteration by its ID.
 * 
 * @function GET /get/:ticketIterationID
 * @description This route fetches a ticket iteration by its ID and returns it, requiring the user to be signed in and an admin.
 * @param {Object} req - The request object containing the `ticketIterationID` parameter in the URL.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Calls `ticketIterationGet` to retrieve the ticket iteration and `ticketIterationById` to return the iteration data.
 */
//router.get('/get/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);
router.get('/get/:ticketIterationID', authController.requireSignin, ticketIterationController.ticketIterationGet, ticketIterationController.ticketIterationById);

/**
 * Handles the PUT request to edit a ticket iteration.
 * 
 * @function PUT /edit/:ticketIterationID
 * @description This route updates an existing ticket iteration, requiring the user to be signed in and an admin.
 * @param {Object} req - The request object, containing the data to update the ticket iteration.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Calls the `update` method in the `ticketIterationController` to update the ticket iteration.
 */
router.put('/edit/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.update);

/**
 * Handles the DELETE request for removing a specific ticket iteration.
 * 
 * @function DELETE /delete/:ticketIterationID
 * @description This route deletes a ticket iteration by its ID, requiring the user to be signed in and an admin.
 * @param {Object} req - The request object, which contains the `ticketIterationID` parameter for the iteration to delete.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Calls the `remove` method in the `ticketIterationController` to delete the ticket iteration.
 */
router.delete('/delete/:ticketIterationID', authController.requireSignin, authController.requireAdmin, ticketIterationController.remove);

module.exports = router;

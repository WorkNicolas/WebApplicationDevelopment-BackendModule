/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * Ticket Routes for managing tickets in the application.
 *
 * @module TicketRoutes
 * @author Nico
 * @version 1.0.0
 * @date 2024-11-08
 * @description This module defines the routes related to tickets, including creating, listing, retrieving, updating, and deleting tickets. It also includes authentication middleware to secure specific routes.
*/
/**
 * @requires express
 * @requires ticketController
 * @requires authController
 */
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');

/**
 * @route GET /api/ticket
 * @description Returns a simple message indicating the ticket resource.
 */
router.get("/", function (req, res, next) {
    res.send("Respond with a ticket resource");
});

/**
 * @route POST /api/ticket/create
 * @description Creates a new ticket. Requires user to be signed in.
 * @requiresAuth
 */
// router.post('/create', authController.requireSignin, ticketController.create);
router.post('/create', authController.requireSignin, ticketController.create);

/**
 * @route GET /api/ticket/list
 * @description Lists all tickets in the system.
 */
//router.get('/list', authController.requireSignin, authController.requireAdmin, ticketController.list);
router.get('/list/:userID', authController.requireSignin, ticketController.list);

/**
 * @route GET /api/ticket/get/:ticketID
 * @description Retrieves a specific ticket by its ID.
 */
//router.get('/get/:ticketID', authController.requireSignin, authController.requireSameID, ticketController.ticketGet, ticketController.ticketByID);
router.get('/get/:ticketID', authController.requireSignin, ticketController.ticketByID);

/**
 * @route PUT /api/ticket/edit/:ticketID
 * @description Updates a specific ticket. Requires user to be signed in.
 * @requiresAuth
 */
// router.put('/edit/:ticketID', authController.requireSignin, authController.requireSameID, ticketController.update);
router.put('/edit/:ticketID', authController.requireSignin, ticketController.update);

/**
 * @route DELETE /api/ticket/delete/:ticketID
 * @description Deletes a specific ticket. Requires user to be signed in.
 * @requiresAuth
 */
// router.delete('/delete/:ticketID', authController.requireSignin, authController.requireAdmin, ticketController.remove);
router.delete('/delete/:ticketID', authController.requireSignin, ticketController.remove);

module.exports = router;


/**
 * Router for handling the home page route.
 * 
 * @module HomeRouter
 * @version 1.0.0
 * @date 2024-11-10
 * @description Defines the route for the home page of the Express application.
 * @author Julio Azevedo de Carvalho
 */

/**
 * @requires express - for creating the router and handling HTTP requests.
 */
const express = require('express');
const router = express.Router();

/**
 * Handles the GET request for the home page (`/`).
 * 
 * @function GET /
 * @description This route handler renders the home page of the application by rendering the 'index' view with a title 'Express'.
 * @param {Object} req - The request object, which contains data for the incoming HTTP request.
 * @param {Object} res - The response object, which is used to send the response back to the client.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @returns {void} Renders the 'index' view with a title of 'Express' on a successful GET request.
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
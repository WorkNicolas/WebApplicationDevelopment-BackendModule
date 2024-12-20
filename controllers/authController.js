/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * Authentication controller for user login and role-based access control.
 *
 * @module AuthController
 * @version 1.0.0
 * @date 2024-11-08
 * @description Defines authentication-related functionality, including user sign-in, token generation, token validation, and role-based access control for admin users.
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 * 
 */

/**
 * @requires UserModel - for querying user data
 * @requires config - for configuration settings like the secret key
 * @requires jwt - for creating JSON Web Tokens
 * @requires express-jwt - for validating JWTs in requests
 */
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

/**
 * Sign-in functionality for user login.
 * 
 * @function signin
 * @async
 * @description Authenticates the user by checking the email and password. If valid, generates a JWT token and sends it in the response.
 * @param {Object} req - The request object, containing the user's email and password in the body.
 * @param {Object} res - The response object, where the token is sent if authentication is successful.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the user is not found or the password does not match.
 * @returns {Object} A JSON response containing the success status and the JWT token.
 */
module.exports.signin = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found.");
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");

    let payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    // Generates the token
    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "365d",
    });

    // Sends the token in the body of the response to the client.
    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Token validation middleware.
 * 
 * @function requireSignin
 * @description Middleware that validates the JWT token in the request header using the secret key and algorithm.
 * @param {Object} req - The request object, containing the JWT token.
 * @param {Object} res - The response object, where an error is sent if the token is invalid.
 * @param {function} next - The next middleware function to call if the token is valid.
 * 
 * @throws {Error} If the token is not valid or expired.
 */
module.exports.requireSignin = expressjwt({
  secret: config.SECRETKEY,
  algorithms: ["HS512"],
  userProperty: "auth",
});

/**
 * Admin role validation middleware.
 * 
 * @function requireAdmin
 * @async
 * @description Middleware to check if the authenticated user has an admin role. If the user is not an admin, access is denied.
 * @param {Object} req - The request object, which should contain the authenticated user's ID from the token.
 * @param {Object} res - The response object, where an error message is sent if the user does not have admin access.
 * @param {function} next - The next middleware function to call if the user has admin rights.
 * 
 * @throws {Error} If the user does not have an admin role or is not found in the database.
 * @returns {Object} A JSON response with a success message and access granted if the user is an admin.
 */
module.exports.requireAdmin = async function (req, res, next) {
  try {
    // Get user through auth id
    let user = await User.findById(req.auth.id);

    // Return error if no user is found or user role is not admin
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: User is not an admin.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/**
 * Same ID Validation Middleware.
 * 
 * @function requireSameID
 * @async
 * @description Middleware to check if the authenticated user ID is stored in the ticket.
 * @param {Object} req - The request object, which should contain the authenticated user's ID from the token.
 * @param {Object} res - The response object, where an error message is sent if the user does not have access.
 * @param {function} next - The next middleware function to call if the user has rights to the ticket.
 * 
 * @throws {Error} If the user does not have an admin role or is not found in the database.
 * @returns {Object} A JSON response with a success message and access granted if the user is an admin.
 */
module.exports.requireSameID = async function (req, res, next) {
  try {
    // Ticket ID
    const ticketID = req.params.ticketID;
    console.log('Ticket ID:', ticketID);

    // Attached User ID
    const ticket = await Ticket.findById(ticketID);
    const attachedUserId = ticket.userId;
    console.log('Attached User ID: ', attachedUserId);

    // User ID
    const user = await User.findById(req.auth.id);
    console.log('User ID:', user._id.toString());

    // Comparison
    if (attachedUserId.toString() != user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this ticket.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

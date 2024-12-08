/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * User controller for managing users in the system.
 *
 * @module UserController
 * @version 1.0.0
 * @date 2024-11-10
 * @description Defines various CRUD operations (Create, Read, Update, Delete) for managing user records.
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 */

/**
 * @requires UserModel - for performing database operations on user records
 */
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
/**
 * Creates a new user in the system.
 * 
 * @function create
 * @async
 * @description This function creates a new user based on the data provided in the request body. The user is added to the database and a success message is returned.
 * @param {Object} req - The request object, which contains the user data in the body.
 * @param {Object} res - The response object, which sends a success message on user creation.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue creating the user in the database.
 * @returns {Object} A JSON response with a success message if the user is created successfully, or an error message if creation fails.
 */
module.exports.create = async function (req, res, next) {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);

    let payload = { 
      id: result._id,
      username: result.username,
      role: result.role,
    };

    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "365d",
    });

    res.json({
      success: true,
      message: "User created successfully.",
      token: token,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Lists all users, excluding their password field.
 * 
 * @function list
 * @async
 * @description Retrieves a list of all users from the database, excluding their passwords. This list is returned in the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object, which sends the list of users.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If there is an issue retrieving the users from the database.
 * @returns {Object} A JSON response containing the list of users.
 */
module.exports.list = async function (req, res, next) {
  try {
    let list = await UserModel.find({}, "-password");

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Retrieves a specific user by their ID and assigns it to `req.user`.
 * 
 * @function userGet
 * @async
 * @description This function is a middleware that retrieves a specific user based on the provided user ID in the request parameters. The user is attached to `req.user` for further use.
 * @param {Object} req - The request object, which contains the user ID in the parameters.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function to call if the user is found.
 * 
 * @throws {Error} If the user is not found in the database.
 * @returns {undefined} The user is attached to `req.user` for further use.
 */
module.exports.userGet = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    req.user = await UserModel.findOne({ _id: uID }, "-password");
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Sends the details of a specific user.
 * 
 * @function userByID
 * @description This function sends the details of the user attached to `req.user` as the response.
 * @param {Object} req - The request object, which contains the user attached to `req.user`.
 * @param {Object} res - The response object, which sends the user data.
 * @param {function} next - The next middleware function to call.
 * 
 * @returns {Object} A JSON response containing the user details.
 */
module.exports.userByID = async function (req, res, next) {
  res.json(req.user);
};

/**
 * Updates an existing user.
 * 
 * @function update
 * @async
 * @description This function updates an existing user's data with the provided information in the request body. It checks if the user exists and proceeds with the update, sending a success message if the update is successful.
 * @param {Object} req - The request object, which contains the user ID in the parameters and the updated data in the body.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the user is not found or if the update fails.
 * @returns {Object} A JSON response with a success message if the user is updated successfully, or an error message if the update fails.
 */
module.exports.update = async function (req, res, next) {
  try {
    let uID = req.params.userID;
    let updateUser = new UserModel(req.body);
    updateUser._id = uID;

    let result = await UserModel.updateOne({ _id: uID }, updateUser);

    let payload = {
      id: uID,
      username: updateUser.username,
      role: updateUser.role,
    };

    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "365d",
    });

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "User updated successfully.",
        token: token,
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not updated. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Deletes an existing user.
 * 
 * @function remove
 * @async
 * @description This function deletes a user. It checks if the user exists and proceeds with the deletion, sending a success message if the delete is successful.
 * @param {Object} req - The request object, which contains the user ID in the parameters and the updated data in the body.
 * @param {Object} res - The response object, which sends the success or failure message.
 * @param {function} next - The next middleware function to call if an error occurs.
 * 
 * @throws {Error} If the user is not found or if the update fails.
 * @returns {Object} A JSON response with a success message if the user is updated successfully, or an error message if the update fails.
 */
module.exports.remove = async function (req, res, next) {
  try {
    let uID = req.params.userID;

    let result = await UserModel.deleteOne({ _id: uID });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


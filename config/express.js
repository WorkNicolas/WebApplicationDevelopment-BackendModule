/**
 * Main application file for configuring and running the Express server.
 *
 * @module app
 * @version 1.0.0
 * @date 2024-11-08
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 */

/**
 * Import Required Modules
 * @requires createError
 * @requires express
 * @requires cookieParser
 * @requires logger
 */
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
/**
 * Import Routers
 * @requires indexRouter
 * @requires usersRouter
 * @requires ticketRouter
 * @requires ticketIterationRouter
 */
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const ticketRouter = require("../routes/tickets");
const ticketIterationRouter = require("../routes/ticketIterations"); 

// Express Application Instance
const app = express();


// Middleware Setup
app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route Definitions
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/ticketIteration", ticketIterationRouter);

// Catch 404 Errors and Forward to Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

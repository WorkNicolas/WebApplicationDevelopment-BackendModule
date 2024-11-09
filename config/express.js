const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// import routers
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const ticketRouter = require("../routes/tickets");
const ticketIterationRouter = require("../routes/ticketIterations"); 

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/ticketIteration", ticketIterationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Send the error message
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

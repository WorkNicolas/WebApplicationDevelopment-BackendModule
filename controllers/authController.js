const User = require("../models/User");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

module.exports.signin = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found.");
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");

    let payload = {
      id: user._id,
      username: user.username,
    };

    // Generates the token
    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "20min",
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

// Check the token validation
module.exports.requireSignin = expressjwt({
  secret: config.SECRETKEY,
  algorithms: ["HS512"],
  userProperty: "auth",
});

module.exports.requireAdmin = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
      next();
  } else {
      return res.status(403).json({
          success: false,
          message: "Access denied."
      })
  }
};
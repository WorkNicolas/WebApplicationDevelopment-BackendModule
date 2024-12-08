/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * User schema for MongoDB using Mongoose.
 *
 * @module UserModel
 * @version 1.0.0
 * @date 2024-11-08
 * @description Defines the schema for the `User` model, representing users of the application. It includes fields for username, email, hashed password, role, and timestamps for account creation and updates.
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 * 
 */
 

/**
 * @requires mongoose
 * @requires Schema
 * @requires crypto
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let crypto = require("crypto");

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user. (required, unique)
 * @property {string} email - The user's email address. (unique, must match email pattern)
 * @property {string} hashed_password - The hashed password of the user. (required)
 * @property {string} salt - The salt used to hash the password.
 * @property {string} role - The role of the user, either "admin" or "user". (default "user")
 * @property {Date} createdAt - The date and time when the user account was created. (auto-generated by Mongoose)
 * @property {Date} updatedAt - The date and time when the user account was last updated. (auto-generated by Mongoose)
 */
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid e-mail address."],
    },
    phone: {
      type: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);

// Virtual field for password
// Sets the password, hashes it, and generates salt
UserSchema.virtual("password").set(function (password) {
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  } else {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString("base64"),
      "base64"
    );
    this.hashed_password = this.hashPassword(password);
  }
});

// Hash password using PBKDF2 algorithm
// Includes salt, iterations, and hash output length
UserSchema.methods.hashPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("base64");
};

// Compare the hashed password with the stored one
UserSchema.methods.authenticate = function (password) {
  return this.hashed_password === this.hashPassword(password);
};

// Ensure virtual fields are serialized and exclude sensitive data
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hashed_password;
    delete ret.salt;
  },
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);

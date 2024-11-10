/**
 * Database configuration for connecting to MongoDB Atlas and securing application data.
 *
 * @module config
 * @version 1.0.0
 * @date 2024-11-08
 * @description Contains database connection URI and secret key for cryptographic operations.
 * @property {string} ATLASDB - The connection URI for the MongoDB Atlas database.
 * @property {string} SECRETKEY - The secret key used for cryptographic operations, such as signing tokens.
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 */

/**
 * Database configuration for connecting to MongoDB Atlas and securing application data.
 *
 * @module config
 * @property {string} ATLASDB - The connection URI for the MongoDB Atlas database.
 * @property {string} SECRETKEY - The secret key used for cryptographic operations, such as signing tokens.
 */
module.exports = {
  ATLASDB:
    "mongodb+srv://grp6ticket:BuD9mr4fYX6ppNVz@cluster0.cffsw.mongodb.net/",
  SECRETKEY: "YBqV&O3VFiV5dGXrAX/10$q_,yPRq",
};

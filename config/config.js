/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

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
  ATLASDB: process.env.ATLASDB,
  SECRETKEY: process.env.SECRETKEY,
};

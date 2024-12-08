/**
Mendoza, Carl Nicolas – 301386435
To, Cheuk Man Edmond– 301378748
Dou, Fang – 301381266
HUI, LIT TUNG – 301387861
**/

/**
 * Database connection setup using Mongoose and MongoDB Atlas.
 *
 * @module database
 * @version 1.0.0
 * @date 2024-11-08
 * @description Establishes a connection to the MongoDB Atlas database using Mongoose. Logs messages for successful connection and connection errors.
 * @author Carl Nicolas Mendoza
 * @author Julio Azevedo de Carvalho
 * 
 * @function
 * @name connectToDatabase
 * @description Connects to MongoDB using the connection URI from the `config` module.
 * @throws {Error} If there is an error connecting to the MongoDB database.
 */

// Import Config
let config = require('./config');

// Database setup
const mongoose = require('mongoose');

// Connect to Database
module.exports = function(){
    // Establish Connection
    mongoose.connect(config.ATLASDB);

    let mongodb = mongoose.connection;

    // Handling Error Connections
    mongodb.on('error', console.error.bind(console, 'Connection Error: '));

    // Logging Successful Connection Message
    mongodb.once('open', ()=>{
        console.log("====> Connected to MongoDB.");
    })
}
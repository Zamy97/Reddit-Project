// /* Mongoose Connection */
// const mongoose = require("mongoose");
// assert = require("assert");
//
// const url = "mongodb://localhost/reddit-db";
// mongoose.Promise = global.Promise;
// mongoose.connect(
//     "mongodb://localhost/reddit-db",
//     { useMongoClient: true }
//     // { useNewUrlParser: true },
//     // function(err, db) {
//     //     assert.equal(null, err);
//     //     console.log("Connected successfully to database");
//     // }
// );
// mongoose.connection.on("Error", console.error.bind(console, "MongoDB connection Error: "));
// mongoose.set("debug", true);
//
// module.exports = mongoose.connection;

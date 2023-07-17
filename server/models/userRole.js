/* This code is defining a Mongoose schema for a user role. It requires the Mongoose library, creates a
new schema with a single field `user_roll` that is a required string and must be unique, and exports
a Mongoose model for this schema named "UserRole". */
const mongoose = require("mongoose");

const UserRole = new mongoose.Schema({
    user_roll: { type: String, required: true, unique: true },
    
});

module.exports = mongoose.model("UserRole", UserRole);

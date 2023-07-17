const mongoose = require("mongoose");

const UserRole = new mongoose.Schema({
    user_roll: { type: String, required: true, unique: true },
    
});

module.exports = mongoose.model("UserRole", UserRole);

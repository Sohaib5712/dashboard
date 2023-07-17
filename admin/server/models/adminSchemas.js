const mongoose = require("mongoose");

const Student = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	gender: { type: String, required: true },
	phone: { type: Number, required: true },
	subject: { type: Array, required: true },
	date: { type: Date, default: Date.now },
	callStatus: { type: Array, default: [] },
});

module.exports = mongoose.model("StudentData", Student);

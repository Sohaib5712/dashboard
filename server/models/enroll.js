const mongoose = require("mongoose");
 
const Enroll = new mongoose.Schema({
	name: { type: String, required: true },
	fatherName: { type: String, required: true },
	course: { type: String},
	email: { type: String},
	contact: { type: Number },
	image:{type:String}
});

module.exports = mongoose.model("Enrollment", Enroll);

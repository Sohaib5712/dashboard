const mongoose = require("mongoose");
 
const Course = new mongoose.Schema({
	course_name: { type: String, required: true },
	desc: { type: String},
	fee: { type: Number, required: true },
	discount: { type: Number},
	duration: { type: String, required: true },
	teacher: { type: String },
	offer: { type: String },
	content: { type: String },
	keyWords: { type: String },
	image:{type:String}
});

module.exports = mongoose.model("CourseData", Course);

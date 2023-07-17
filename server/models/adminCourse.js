/* This is a JavaScript code that defines a Mongoose schema for a course. Mongoose is a popular Object
Data Modeling (ODM) library for MongoDB and this code is using it to define the structure of a
course document in a MongoDB database. */
const mongoose = require("mongoose");

const Course = new mongoose.Schema({
	course_name: { type: String, required: true },
	desc: { type: String },
	fee: { type: Number, required: true },
	discount: { type: Number },
	duration: { type: String, required: true },
	teacher: { type: String },
	courseImage: { type: String },
	courseImageUrl: { type: String },
});

module.exports = mongoose.model("CourseData", Course);

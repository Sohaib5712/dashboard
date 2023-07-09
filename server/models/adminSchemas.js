/* This is a code snippet for defining a Mongoose schema for a student data model. It defines the
structure of the data that will be stored in a MongoDB database using Mongoose. The schema includes
fields for the student's name, email, gender, phone number, subjects, date, and call status. The
`mongoose.model` method is used to create a model for the schema, which can be used to interact with
the database. The model is exported as a module so that it can be used in other parts of the
application. */
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

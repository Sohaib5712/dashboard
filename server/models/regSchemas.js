const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
    degree: {
        type: String,
    },
    institute: {
        type: String,
    },
    year: {
        type: Number,
    },
    marks: {
        type: Number,
    },
});

const admissionSchema = new mongoose.Schema({
    roll_no: {
        type: String,
        required: true,
        unique: true,
    },
    courseAppliedFor: {
        type: String,
        required: true,
    },
    batchName: {
        type: String,
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    fatherName: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    mailingAddress: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    fatherNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    academicRecords: [academicRecordSchema],
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;

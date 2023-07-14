const Admission = require("../models/regSchemas");
const createReg = async (req, res) => {
    try {
        const admissionData = req.body;

        // Get the current year
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        // Get the count of existing records for the current year
        const count = await Admission.countDocuments(
		{ roll_no: { $regex: `^${year}-TS-` } });

        // Generate the roll_no value
        const roll_no = `${year}-TS-${count + 1}`;

        const admission = await Admission.create({ ...admissionData, roll_no });

        res.status(201).json(admission);
    } catch (error) {
        console.error("Error creating admission record:", error);
        res.status(500).json({ error: "Failed to create admission record" });
    }
};



// get all reg student
const getRegRecord = async (req, res) => {
    const reg = await Admission.find({});
    res.status(200).json(reg);
};

// get single record
const getRegstudentRecord = async (req, res) => {
    const { id } = req.params;
    const student = await Admission.findById({ _id: id });
    if (!student) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ student });
};

// delete row
const deleteRegstudent = async (req, res) => {
    const { id } = req.params;
    const student = await Admission.findByIdAndDelete({ _id: id });
    if (!student) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ student });
};

// update reg student
const updateRegStudent = async (req, res) => {
    const { id } = req.params;
    // const { newData } = req.body;

    const student = await Admission.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    if (!student) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ student });
};
// search student
const searchStudent = async (req, res) => {
    try {
      const regex = new RegExp(req.params.key, "i"); // "i" flag makes the regex case-insensitive
      const data = await Admission.find({
        $or: [{ roll_no: { $regex: regex } }]
      });
      res.json(data);
    } catch (error) {
      console.error("Error during search:", error);
      res.status(500).json({ error: "An error occurred during the search" });
    }
  };
  
  const checkEnrollment = async (req, res) => {
    const { name } = req.body;
    try {
      const student = await Admission.findOne({ name });
      if (student) {
        res.status(200).json({ result: "You are enrolled!" });
      } else {
        res.status(200).json({ result: "You are not enrolled!" });
      }
    } catch (error) {
      res.status(400).json({ error: "Error finding enrollment record" });
    }
  };

module.exports = {
    createReg,
    getRegRecord,
    deleteRegstudent,
    getRegstudentRecord,
    updateRegStudent,
    searchStudent,
    checkEnrollment
};

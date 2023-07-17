const Student = require("../models/adminSchemas");


// ......student

// get all record
const getStudentRecords = async (req, res) => {
    const students = await Student.find({});
    res.status(200).json(students);
};

// get single record
const getStudentRecord = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById({ _id: id });
    if (!student) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ student });
};

// create new student record
const createStudent = async (req, res) => {
    const { name, gender, email, phone, subject } = req.body;
    try {
        const student = await Student.create({
            name,
            gender,
            email,
            phone,
            subject,
        });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete single record

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete({ _id: id });
    if (!student) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ student });
};

// update student call status record

const updateCallStatus = async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    const student = await Student.findByIdAndUpdate(
        id,
        { $push: { callStatus: newData } },
        { new: true }
    );

    if (!student) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ student });
};

// update student call status record

const updateStudent = async (req, res) => {
    const { id } = req.params;
    // const { newData } = req.body;

    const student = await Student.findByIdAndUpdate(
        {_id: id},
        req.body,
        { new: true }
    );

    if (!student) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ student });
};

// search student
const searchStd = async (req, res) => {
    try {
      const regex = new RegExp(req.params.key, "i"); // "i" flag makes the regex case-insensitive
      const data = await Student.find({
        $or: [{ name: { $regex: regex } }]
      });
      res.json(data);
    } catch (error) {
      console.error("Error during search:", error);
      res.status(500).json({ error: "An error occurred during the search" });
    }
  };


// create new student record


module.exports = { 
createStudent,
getStudentRecords,
getStudentRecord,
deleteStudent,
updateCallStatus,
updateStudent,
searchStd,
};


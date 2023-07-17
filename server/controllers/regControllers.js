/* This is a module exporting several functions related to CRUD operations for a registration system. */
const Admission = require("../models/regSchemas");
const createReg = async (req, res) => {
    try {
        const admissionData = req.body;

        // Fetch the course fee from the course API based on the selected course
        const courseResponse = await fetch(
            `http://localhost:4000/api/admin/course?course=${admissionData.courseAppliedFor}`
        );
        const courseData = await courseResponse.json();
        if (courseResponse.ok) {
            const courseFee = courseData[0].fee;

            // Calculate the discount
            const installment1 = Number(admissionData.stdFee.first);
            const installment2 = Number(admissionData.stdFee.second);
            const totalInstallments = installment1 + installment2;
            const discount = courseFee - totalInstallments;

            // Get the current year
            const currentDate = new Date();
            const year = currentDate.getFullYear();

            // Get the count of existing records for the current year
            const count = await Admission.countDocuments({
                roll_no: { $regex: `^${year}-TS-` },
            }).exec();

            // Generate the roll_no value
            const roll_no = `${year}-TS-${count + 1}`;

            const admission = new Admission({ ...admissionData, roll_no, discount });

            // Validate and sanitize the input data
            const errors = admission.validateSync();
            if (errors) {
                res.status(400).json({ error: "Invalid admission data" });
                return;
            }

            // Save the admission record
            const createdAdmission = await admission.save();

            res.status(201).json(createdAdmission);
        } else {
            console.error("Error fetching course data:", courseData.error);
            res.status(500).json({ error: "Internal server error." });
        }
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

module.exports = {
    createReg,
    getRegRecord,
    deleteRegstudent,
    getRegstudentRecord,
    updateRegStudent,
};

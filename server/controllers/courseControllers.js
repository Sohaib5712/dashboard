// const { model } = require("mongoose");
const Course = require("../models/adminCourse");
// get all course record
const getCourseRecords = async (req, res) => {
    const course = await Course.find({});
    res.status(200).json(course);
};

// create new course record
const createCourse = async (req, res) => {
    const { course_name, desc, fee, discount, duration, teacher } = req.body;

    try {
        const course = await Course.create({
            course_name,
            desc,
            fee,
            discount,
            duration,
            teacher,
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get single record
const getSingleCourse = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ course });
};

// delete single record

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ course });
};

// update reg course
const updateCourse = async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    if (!course) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ course });
};

module.exports = {
    getCourseRecords,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse
}

/* This is a module that exports several functions related to managing course records in a database
using Mongoose. The functions include getting all course records, creating a new course record,
getting a single course record by ID, deleting a single course record by ID, and updating a course
record by ID. */
const Course = require("../models/adminCourse");
const path = require("path");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images/course"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

// Set up multer upload
const upload = multer({ storage: storage }).single("courseImage");

// get all course records
const getCourseRecords = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// create new course record
const createCourse = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to upload course image" });
        }

        const { course_name, desc, fee, discount, duration, teacher } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Course image is required" });
        }

        try {
            // Save the image locally
            const courseImage = req.file.filename;

            // Upload the image to Cloudinary
            const cloudinary = require("cloudinary").v2;
            cloudinary.config({
                cloud_name: "dzmw7vdta",
                api_key: "662373592339258",
                api_secret: "P1kW9Xzmb0tBpcq8HTB4awSpTzQ",
            });

            const cloudinaryUploadResult = await cloudinary.uploader.upload(
                path.join(__dirname, "../images/course", courseImage),
                {
                    folder: "course",
                    use_filename: true, // Use the original filename
                }
            );

            // Get the URL of the uploaded image from Cloudinary
            const courseImageUrl = cloudinaryUploadResult.secure_url;

            // Create the course record
            const course = await Course.create({
                course_name,
                desc,
                fee,
                discount,
                duration,
                teacher,
                courseImage: courseImage, // Store the image filename in the courseImage field
                courseImageUrl: courseImageUrl, // Store the Cloudinary URL in the courseImageUrl field
            });

            res.status(200).json(course);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

// get single record
const getSingleCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(400).json({ error: "No Record Found!!!" });
        }
        res.status(200).json({ course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete single record
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(400).json({ error: "No Record Found!!!" });
        }
        res.status(200).json({ course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update reg course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!course) {
            return res.status(400).json({ error: "No Record Found!!!" });
        }
        res.status(200).json({ course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getCourseRecords,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse,
};

// const { model } = require("mongoose");
const Course = require("../models/adminCourse");
const multer = require("multer");
const path = require("path");
// get all course record
const getCourseRecords = async (req, res) => {
    const course = await Course.find({});
    res.status(200).json(course);
};



// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Set the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

// Multer upload instance
const upload = multer({ storage });

const createCourse = async (req, res) => {
  upload.single("courseImage")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Error uploading image." });
    }

    const { course_name, desc, fee, discount, duration,
       teacher,offer,content,keyWords } = req.body;

    try {
      const course = await Course.create({
        course_name, desc, fee, discount,duration, 
        offer, content, keyWords, teacher, 
        image: req.file ? req.file.filename : null,
      });

      res.status(200).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(400).json({ error: error.message });
    }
  });
};



// get single record
const getSingleCourse = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json( course );
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

const getDoc = async(req,res)=>{ 
       const data = await User.find();
       res.render('../views/show.ejs',{data:data})
       console.log(data)
    }

// update reg course
const updateCourse = async (req, res) => {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    if (!course) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json( course );
};

module.exports = {
    getCourseRecords,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse
}

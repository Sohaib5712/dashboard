const Faculty = require('../models/faculty')
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const createFaculty = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Error uploading image." });
    }

    const { name, mobile, qualification, description, design } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const faculty = new Faculty({
        name,
        mobile,
        qualification,
        description,
        design,
        image,
      });

      await faculty.save();

      res.status(201).json(faculty);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({ error: error.message });
    }
  });
};
  
const getFaculty = async (req,res)=>{
    try{
        const facultyData = await Faculty.find();
        res.status(200).json(facultyData) 
    }
    catch{
        res.status(400).json({ error: error.message });
    }
}


// get single record
const getSingleFaculty = async (req, res) => {
    const { id } = req.params;
    const course = await Faculty.findById({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json( course );
};

// delete single record

const deleteFaculty = async (req, res) => {
    const { id } = req.params;
    const course = await Faculty.findByIdAndDelete({ _id: id });
    if (!course) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({  result: "successfuly deleted" });
};


// update reg course
const updateFaculty = async (req, res) => {
    const { id } = req.params;

    const course = await Faculty.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    if (!course) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json( course );
};
  
module.exports = { 
    createFaculty,
    getFaculty,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
}
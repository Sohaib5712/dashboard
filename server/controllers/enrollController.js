const Enroll = require('../models/enroll')
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/enroll"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const Enrolled = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Error uploading image." });
    }

    const { name,fatherName,course,email,contact } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const enroll = new Enroll({
        name,
        fatherName,
        course,
        email,
        image,
        contact
      });

      await enroll.save();

      res.status(201).json(enroll);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({ error: error.message });
    }
  });
};
  
const getEnroll = async (req,res)=>{
    try{
        const enrollData = await Enroll.find();
        res.status(200).json(enrollData) 
    }
    catch{
        res.status(400).json({ error: error.message });
    }
}


// // get single record
// const getSingleBlog = async (req, res) => {
//     const { id } = req.params;
//     const course = await Blog.findById({ _id: id });
//     if (!course) {
//         return res.status(400).json({ error: "no Record Found!!!" });
//     }

//     res.status(200).json( course );
// };

// // delete single record 

// const deleteBlog = async (req, res) => {
//     const { id } = req.params;
//     const course = await Blog.findByIdAndDelete({ _id: id });
//     if (!course) {
//         return res.status(400).json({ error: "no Record Found!!!" });
//     }

//     res.status(200).json({ course });
// };


// // update reg course
// const updateBlog = async (req, res) => {
//     const { id } = req.params;

//     const course = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
//         new: true,
//     });

//     if (!course) {
//         return res.status(400).json({ error: "No record found!!!" });
//     }

//     res.status(200).json( course );
// };
  
module.exports = { 
    Enrolled,
    getEnroll,
    // getSingleBlog,
    // deleteBlog,
    // updateBlog,
}
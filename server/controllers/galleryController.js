const Gallery = require('../models/gallery');
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
  
  const createGallery = async (req, res) => {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Error uploading image." });
      }
  
      const { title } = req.body;
      const image = req.file ? req.file.filename : null;
  
      try {
        const blog = new Gallery({
          title, image,
        });
  
        await blog.save();
  
        res.status(201).json(blog);
      } catch (error) {
        console.error("Error creating blog:", error);
        res.status(400).json({ error: error.message });
      }
    });
  };
    
  const getGallery = async (req,res)=>{
      try{
          const galleryData = await Gallery.find();
          res.status(200).json(galleryData) 
      }
      catch{
          res.status(400).json({ error: error.message });
      }
  }

module.exports = { 
  createGallery,
  getGallery
};

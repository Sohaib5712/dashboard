const express = require("express");
const router = express.Router();

const {
      createNews,
    getNews,
    getSinglenews,
    // deleteBlog,
    // updateBlog,
} = require("../controllers/newsController");


// to get all record.
router.get("/getNews", getNews);
// to post new record.
router.post("/creates", createNews);
// to get single record
router.get("/news/:id",getSinglenews);
// to delete the record
// router.delete("/blog/:id", deleteBlog);
// to update course
// router.put("/Blog/:id", updateBlog);

//////////// gallery routes/////////

const {
  createGallery,
  getGallery
} = require("../controllers/galleryController");


// to get all record.
router.get("/getImages", getGallery);
// to post new record.
router.post("/gallery", createGallery);
// to get single record
// router.get("/news/:id",getSinglenews);
// to delete the record
// router.delete("/blog/:id", deleteBlog);
// to update course
// router.put("/Blog/:id", updateBlog);


module.exports = router;

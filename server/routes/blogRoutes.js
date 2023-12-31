const express = require("express");
const router = express.Router();

const {
      createBlogs,
    getBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog,
} = require("../controllers/blogController");


// to get all record.
router.get("/blogData", getBlog);
// to post new record.
router.post("/blog", createBlogs);
// to get single record
router.get("/blog/:id", getSingleBlog);
// to delete the record
router.delete("/blog/:id", deleteBlog);
// to update course
router.put("/Blog/:id", updateBlog);


const {
Enrolled,
getEnroll,
// getSingleBlog,
// deleteBlog,
// updateBlog,
} = require("../controllers/enrollController");



// to get all record.
router.post("/dataEnroll", Enrolled);
// to post new record.
router.get("/enrollData", getEnroll);
// // to get single record
// router.get("/blog/:id", getSingleBlog);
// // to delete the record
// router.delete("/blog/:id", deleteBlog);
// // to update course
// router.put("/Blog/:id", updateBlog);

module.exports = router;

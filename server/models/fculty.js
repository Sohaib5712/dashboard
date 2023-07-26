const express = require("express");
const router = express.Router();

const {
    createFaculty,
    getFaculty,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
} = require("../controllers/faculty");


// to get all record.
router.get("/getFaculty", getFaculty);
// to post new record.
router.post("/createFaculty", createFaculty);
// to get single record
router.get("/faculty/:id", getSingleFaculty);
// to delete the record
router.delete("/faculty/:id", deleteFaculty);
// to update course
router.put("/faculty/:id", updateFaculty);

module.exports = router;

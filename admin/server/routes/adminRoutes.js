const express = require("express");
const router = express.Router();

const {
    createStudent,
    getStudentRecords,
    getStudentRecord,
    deleteStudent,
    updateStudent,
    updateCallStatus,
    searchStd,
} = require("../controllers/stdControllers");

const {
    getCourseRecords,
    createCourse,
    deleteCourse,
    updateCourse,
    getSingleCourse
} = require("../controllers/courseControllers");

const {
    signupUser,
    loginUser,
    getUserRecord,
    getUserRecords,
    sendMail
} = require("../controllers/userControllers");

const {
    getRoleRecord,
    createRoleRecord,
} = require("../controllers/roleControllers");

const {
    createReg,
    getRegRecord,
    deleteRegstudent,
    getRegstudentRecord,
    updateRegStudent,
    searchStudent,
    checkEnrollment,
} = require("../controllers/regControllers");

// for admission student
router.post("/register", createReg);
// gett all record
router.get("/register", getRegRecord);
// delete
router.delete("/register/:id", deleteRegstudent);
// get single record
router.get("/register/:id", getRegstudentRecord);
// for update reg student
router.patch("/register/:id", updateRegStudent);

// user.............

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

// get userss
router.get("/user", getUserRecords);

// get single user
router.get("/user/:id", getUserRecord);

// get role
router.get("/role", getRoleRecord);

// gell all role record
router.post("/addrole", createRoleRecord);

// course...........

// to get all record.
router.get("/course", getCourseRecords);
// to post new record.
router.post("/create", createCourse);
// to get single record
router.get("/course/:id", getSingleCourse);
// to delete the record
router.delete("/course/:id", deleteCourse);
// to update course
router.put("/course/:id", updateCourse);


// student........

// to get all record.
router.get("/", getStudentRecords);

// to get single record.
router.get("/:id", getStudentRecord);

// to post new record.
router.post("/", createStudent);

// to delete a record.
router.delete("/:id", deleteStudent);

// to update student data
router.put("/update/:id", updateStudent);

// to update a call status.
router.post("/:id", updateCallStatus);

router.get('/search/:key',searchStudent)

router.get('/simpleSearch/:key',searchStd)
// verifyStudent
router.post("/register/check-enrollment", checkEnrollment);




module.exports = router;

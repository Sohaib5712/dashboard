/* This is a router module in Node.js using the Express framework. It defines various routes and their
corresponding controller functions for handling HTTP requests and responses. The routes include
operations for creating, reading, updating, and deleting records for students, courses, users,
roles, and registration. It also includes routes for user authentication and authorization. */
const express = require("express");
const router = express.Router();

const {
    createStudent,
    getStudentRecords,
    getStudentRecord,
    deleteStudent,
    updateStudent,
    updateCallStatus,
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
    updateUser,
    deleteUser
} = require("../controllers/userControllers");

const {
    getRoleRecord,
    createRoleRecord,
    updateRole,
    deleteRole,
    getRole
} = require("../controllers/roleControllers");

const {
    createReg,
    getRegRecord,
    deleteRegstudent,
    getRegstudentRecord,
    updateRegStudent,
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
router.put("/register/:id", updateRegStudent);


// user.............

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

// get userss
router.get("/user", getUserRecords);

// get single user
router.get("/user/:id", getUserRecord);
// to delete the record user
router.delete("/user/:id", deleteUser);
// to update user
router.put("/user/:id", updateUser);


// rolllllllllllle
// get role
router.get("/role", getRoleRecord);
// get single role
router.get("/role/:id", getRole);
// gell all role record
router.post("/addrole", createRoleRecord);
// to delete the record user
router.delete("/role/:id", deleteRole);
// to update user
router.put("/role/:id", updateRole);








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





module.exports = router;

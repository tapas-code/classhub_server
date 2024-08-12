const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createClassroom,
  assignTeacher,
  assignStudents,
  getAllClassrooms,
} = require("../controllers/classroomController");

const router = express.Router();

// Route to create a classroom (Principal only)
router.post(
  "/create-classroom",
  authMiddleware(["Principal"]),
  createClassroom
);

// Route to assign a teacher (Principal only)
router.post("/assign-teacher", authMiddleware(["Principal"]), assignTeacher);

// Route to assign students (Principal or Teacher)
router.post(
  "/assign-students",
  authMiddleware(["Principal", "Teacher"]),
  assignStudents
);

// Route to get all classrooms (Principal, Teacher, or Student)
router.get(
  "/get-classrooms",
  authMiddleware(["Principal", "Teacher", "Student"]),
  getAllClassrooms
);

module.exports = router;

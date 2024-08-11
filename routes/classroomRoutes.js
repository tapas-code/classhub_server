const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createClassroom, assignTeacher, assignStudents } = require('../controllers/classroomController');

const router = express.Router();

// Route to create a classroom (Principal only)
router.post('/create-classroom', authMiddleware(['Principal']), createClassroom);

// Route to assign a teacher (Principal only)
router.post('/assign-teacher', authMiddleware(['Principal']), assignTeacher);

// Route to assign students (Principal or Teacher)
router.post('/assign-students', authMiddleware(['Principal', 'Teacher']), assignStudents);

module.exports = router;

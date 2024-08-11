const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login, getAllStudents, getAllTeachers } = require('../controllers/authController');

const router = express.Router();

// Route to handle user signup (any role, but typically the Principal or admin creates users)
router.post('/signup', authMiddleware(['Principal']), signup);

// Route to handle user login (open to everyone)
router.post('/login', login);

// Route to get all teachers (restricted to Principal)
router.get('/teachers', authMiddleware(['Principal']), getAllTeachers);

// Route to get all students (restricted to Principal and Teacher)
router.get('/students', authMiddleware(['Principal', 'Teacher']), getAllStudents);

module.exports = router;

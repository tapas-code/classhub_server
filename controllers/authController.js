const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Classroom = require('../models/Classroom');

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Signup function
const signup = async (req, res) => {
  try {
    const { email, password, username, userImg, role, classroom } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // If a classroom is provided, ensure it's valid (except for the Principal role)
    let classroomId = null;
    if (classroom && role !== 'Principal') {
      const classroomDoc = await Classroom.findById(classroom);
      if (!classroomDoc) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
      classroomId = classroomDoc._id;
    }

    // Create the new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      userImg,
      role,
      classroom: classroomId,  // Principal doesn't need a classroom
    });

    // Generate a JWT token
    const token = generateToken(newUser);

    // Respond with the user data and token
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        username: newUser.username,
        userImg: newUser.userImg,
        role: newUser.role,
        classroom: newUser.classroom,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = generateToken(user);

    // Respond with the user data and token
    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        userImg: user.userImg,
        role: user.role,
        classroom: user.classroom,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all teachers function
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'Teacher' });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all students function
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { signup, login, getAllTeachers, getAllStudents };

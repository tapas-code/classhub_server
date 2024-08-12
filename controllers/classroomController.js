const Classroom = require("../models/Classroom");
const User = require("../models/User");

// Create a new classroom
const createClassroom = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the classroom already exists
    const existingClassroom = await Classroom.findOne({ name });
    if (existingClassroom) {
      return res.status(400).json({ message: "Classroom already exists" });
    }

    // Create the new classroom
    const newClassroom = await Classroom.create({ name });

    res.status(201).json({
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Assign a teacher to a classroom
const assignTeacher = async (req, res) => {
  try {
    const { teacherId, classroomId } = req.body;

    // Validate teacher and classroom
    const teacher = await User.findById(teacherId);
    const classroom = await Classroom.findById(classroomId);
    if (!teacher || teacher.role !== "Teacher") {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // Assign the teacher to the classroom
    classroom.teacher = teacherId;
    await classroom.save();

    // Optionally update the teacher's classroom field
    teacher.classroom = classroomId;
    await teacher.save();

    res.status(200).json({
      message: "Teacher assigned to classroom successfully",
      classroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Assign students to a classroom
const assignStudents = async (req, res) => {
  try {
    const { studentIds, classroomId } = req.body;

    // Validate classroom and students
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const students = await User.find({
      _id: { $in: studentIds },
      role: "Student",
    });
    if (students.length !== studentIds.length) {
      return res
        .status(400)
        .json({ message: "Some student IDs are invalid or not found" });
    }

    // Assign students to the classroom
    classroom.students = [...classroom.students, ...studentIds];
    await classroom.save();

    // Optionally update each student's classroom field
    await User.updateMany(
      { _id: { $in: studentIds } },
      { $set: { classroom: classroomId } }
    );

    res.status(200).json({
      message: "Students assigned to classroom successfully",
      classroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all classrooms
const getAllClassrooms = async (req, res) => {
  try {
    // Fetch all classrooms from the database
    const classrooms = await Classroom.find().populate(
      "teacher students",
      "username userImg email role"
    );

    res.status(200).json({
      message: "Classrooms retrieved successfully",
      classrooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createClassroom,
  assignTeacher,
  assignStudents,
  getAllClassrooms,
};

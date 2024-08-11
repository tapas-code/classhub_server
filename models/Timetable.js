const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  schedule: [
    {
      day: { type: String, required: true },
      subjects: [{ subject: String, time: String }], 
    },
  ],
});

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;

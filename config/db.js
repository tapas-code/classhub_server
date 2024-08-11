const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to Database.");
  } catch (err) {
    console.error("Database connection failed.",err);
    process.exit(0);
  }
};

module.exports = connectDB;

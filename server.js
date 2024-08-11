require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const classroomRoutes = require("./routes/classroomRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/classroom", classroomRoutes);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

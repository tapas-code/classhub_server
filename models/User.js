const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },  
  userImg: { type: String },  
  role: { type: String, enum: ['Principal', 'Teacher', 'Student'], required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }  
});

const User = mongoose.model('User', userSchema);

module.exports = User;

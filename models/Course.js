const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: String,
  courseName: String,
  faculty: String,
  schedule: String,
  credits: Number
});

module.exports = mongoose.model('Course', courseSchema);
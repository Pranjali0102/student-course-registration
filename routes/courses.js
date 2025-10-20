const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { courses });
});

module.exports = router;
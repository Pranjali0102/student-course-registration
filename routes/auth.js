const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ✅ Root route — homepage
router.get('/', (req, res) => {
  res.render('home'); // Make sure views/home.ejs exists
});

// 🔐 Login page
router.get('/login', (req, res) => res.render('login'));

// 📝 Registration page
router.get('/register', (req, res) => res.render('register'));

// 📝 Handle registration form
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  await new User({ name, email, password: hashed }).save();
  res.redirect('/login');
});

// 🔐 Handle login form
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/courses');
  } else {
    res.send('Invalid credentials');
  }
});

module.exports = router;
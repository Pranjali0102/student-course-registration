require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// ✅ Connect to MongoDB using the correct environment variable
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// ⚠️ Warning: MemoryStore is not recommended for production
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', require('./routes/auth'));
app.use('/courses', require('./routes/courses'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// routes/user.js
const express = require('express');
const { createUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth'); // Ensure this is imported

const router = express.Router();

// Handles POST request to create a new user
router.post('/', createUser); // Registration route

// Handles POST request to login a user
router.post('/login', loginUser); // Login route

// Handles GET request to fetch user profile
router.get('/me', authenticateToken, getUserProfile); // Protected route to get user profile

module.exports = router;

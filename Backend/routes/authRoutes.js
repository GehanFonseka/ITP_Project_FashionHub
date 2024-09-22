// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate input
      if (!name || !email || !password) {
        console.log('Validation failed: ', { name, email, password });
        return res.status(400).send({ message: 'All fields are required.' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists: ', email);
        return res.status(400).send({ message: 'Email already registered.' });
      }
  
      // Create and save new user
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).send('Login failed');
  }
});

module.exports = router;

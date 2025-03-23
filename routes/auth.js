const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret';

// POST /api/auth/register - register a new user (for DEV only)
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const userId = userModel.createUser(username, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login - User login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    const user = userModel.findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // check if password is valid using bcrypt compare
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password'});
    }

    // generate JWT token
    const token = jwt.sign({ username: user.username}, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

module.exports = router;
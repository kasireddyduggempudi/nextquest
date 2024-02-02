const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

router.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = new User({email, firstName, lastName, password });
    await user.save();
    res.json({ message: 'User registered successfully!!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found with given email');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Incorrect credentials');
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;

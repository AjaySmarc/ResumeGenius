const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/signup
const signup = async (req, res) => {
  const { firstName, lastName, gmail, password, agreedToTerms, receiveUpdates, oauthProvider, oauthId } = req.body;

  try {
    const userExists = await User.findOne({ gmail });
    if (userExists) {
      return res.status(400).json({ message: 'Gmail already registered' });
    }

    const user = await User.create({
      firstName,
      lastName,
      gmail,
      password,
      agreedToTerms,
      receiveUpdates,
      oauthProvider,
      oauthId
    });

    res.status(201).json({
      _id: user._id,
      gmail: user.gmail,
      firstName: user.firstName,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/signin
const signin = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      gmail: user.gmail,
      firstName: user.firstName,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, signin };

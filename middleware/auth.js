// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path according to your project structure

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') {
      return res.status(403).send('Access denied.');
    }
    next();
  } catch (error) {
    res.status(500).send('Server error.');
  }
};

module.exports = { verifyToken, isAdmin };

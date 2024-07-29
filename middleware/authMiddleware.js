// middleware/auth.js
//best approach verify from header


const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = {
  verifyToken,
  verifyAdmin
};


























// verify form header and db

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const getToken = (req) => {
//   const headerToken = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
//   const cookieToken = req.cookies.token;
//   return headerToken || cookieToken;
// };

// const verifyToken = (req, res, next) => {
//   const token = getToken(req);
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// const verifyAdmin = async (req, res, next) => {
//   const token = getToken(req);

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//       const user = await User.findById(decoded.id);
//       if (user && user.role === 'admin') {
//         req.user = decoded;
//         next();
//       } else {
//         res.status(403).json({ message: 'Access denied. Admins only.' });
//       }
//     } catch (err) {
//       res.status(400).json({ message: 'Invalid token.' });
//     }
//   } else {
//     res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
// };

// module.exports = {
//   verifyToken,
//   verifyAdmin
// };




//best approach verfiy from db
// middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.token;
  
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ message: 'Unauthorized' });
//       } else {
//         req.user = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// const requireAdmin = (req, res, next) => {
//   const token = req.cookies.token;
  
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ message: 'Unauthorized' });
//       } else {
//         const user = await User.findById(decodedToken.id);
//         if (user && user.role === 'admin') {
//           req.user = decodedToken;
//           next();
//         } else {
//           res.status(403).json({ message: 'Forbidden' });
//         }
//       }
//     });
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// module.exports = { requireAuth, requireAdmin };



















// routes/userRoutes.js

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers); // Only admins can get all users
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/users', verifyToken, verifyAdmin, userController.getAllUsers); // Only admins can get all users
// router.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out' });
// });





















// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/users', requireAdmin, userController.getAllUsers); // Only admins can get all users
// router.get('/logout', requireAuth, (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out' });
// });

// module.exports = router;









// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/users', userController.getAllUsers);
// router.get("/logout", (req, res) => {
//     res.clearCookie("token");
//     res.json({ message: "Logged out" });
//   });

// module.exports = router;





// const express = require("express");

// const login = require("../controllers/login");
// const createUser = require("../controllers/signup");

// const router = express.Router();

// router.post("/signup", createUser);
// router.post("/login", login);
// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// });
// module.exports = router;
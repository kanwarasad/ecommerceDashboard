// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController'); // Adjust the path according to your project structure

router.use(verifyToken);

router.get('/dashboard', isAdmin, adminController.dashboard);
router.post('/create-category', isAdmin, adminController.createCategory);
// Add more admin routes as needed

module.exports = router;

// routes/adminRoutes.js
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Corrected path
const adminController = require('../controllers/adminController'); // Adjust the path according to your project structure

router.use(verifyToken);

router.get('/dashboard', verifyAdmin, adminController.dashboard);
router.post('/create-category', verifyAdmin, adminController.createCategory);

module.exports = router;






















// const express = require('express');
// const router = express.Router();
// const { verifyToken, verifyAdmin } = require('../middleware/auth');
// const adminController = require('../controllers/adminController'); // Adjust the path according to your project structure

// router.use(verifyToken);

// router.get('/dashboard', verifyAdmin, adminController.dashboard);
// router.post('/createCategory', verifyAdmin, adminController.createCategory);

// module.exports = router;

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.post('/', verifyToken, verifyAdmin, categoryController.createCategory);
router.put('/:id', verifyToken, verifyAdmin, categoryController.updateCategory);
router.get('/', verifyToken, categoryController.getCategories);
router.get('/:id', verifyToken, categoryController.getCategoryById);
router.delete('/:id', verifyToken, verifyAdmin, categoryController.softDeleteCategory);


module.exports = router;
























// const express = require('express');
// const router = express.Router();
// const categoryController = require('../controllers/categoryController');
// const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// // Get all categories
// router.get('/categories', verifyToken, categoryController.getCategories);

// // Get category by ID
// router.get('/categories/:id', verifyToken, categoryController.getCategoryById);

// // Create a new category
// router.post('/categories', verifyToken, verifyAdmin, categoryController.createCategory);

// // Update a category
// router.put('/categories/:id', verifyToken, verifyAdmin, categoryController.updateCategory);

// // Delete a category
// router.delete('/categories/:id', verifyToken, categoryController.deleteCategory);

// module.exports = router;




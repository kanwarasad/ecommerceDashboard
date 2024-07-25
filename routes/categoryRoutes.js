const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/categories', categoryController.getCategories);

// Get category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Create a new category
router.post('/categories', categoryController.createCategory);

// Update a category
router.put('/categories/:id', categoryController.updateCategory);

// Delete a category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;

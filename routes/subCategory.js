// routes/subCategoryRoutes.js
const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.post('/subCategory', subCategoryController.createSubCategory);
router.put('/subCategory/:id/feature', subCategoryController.changeNewArrivalToFeatured);
router.get('/subCategory/featured', subCategoryController.getFeaturedSubCategories);
router.get('/subCategory/new-arrivals', subCategoryController.getNewArrivalSubCategories);

// New route to get all subcategories
router.get('/subcategories', subCategoryController.getAllSubCategories);

module.exports = router;


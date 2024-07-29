// routes/subCategoryRoutes.js

const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Create a new subcategory
router.post('/', verifyToken, verifyAdmin, subCategoryController.createSubCategory);

// Change new arrivals to featured
router.put('/changeNewArrivalToFeatured', verifyToken, verifyAdmin, subCategoryController.changeNewArrivalToFeatured);

// Get all featured subcategories
router.get('/featured', subCategoryController.getFeaturedSubCategories);

// Get all new arrival subcategories
router.get('/new-arrivals', subCategoryController.getNewArrivalSubCategories);

// Get all subcategories
router.get('/', subCategoryController.getAllSubCategories);

// Soft delete a subcategory
router.delete('/:id', verifyToken, verifyAdmin, subCategoryController.softDeleteSubCategories);

module.exports = router;




























// const express = require('express');
// const router = express.Router();
// const subCategoryController = require('./../controllers/subCategoryController');
// const { verifyToken, verifyAdmin } = require('./../middleware/authMiddleware');

// // Routes
// router.post('/subCategory', verifyToken, verifyAdmin, subCategoryController.createSubCategory);
// router.put('/subCategory/:id/feature', verifyToken, verifyAdmin, subCategoryController.changeNewArrivalToFeatured);
// router.get('/subCategory/featured', verifyToken, subCategoryController.getFeaturedSubCategories);
// router.get('/subCategory/new-arrivals', verifyToken, subCategoryController.getNewArrivalSubCategories);
// router.get('/subcategories', verifyToken, verifyAdmin, subCategoryController.getAllSubCategories);
// router.delete('/subCategory/:id', verifyToken, verifyAdmin, subCategoryController.softDeleteSubCategories);


// module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const subCategoryController = require('../controllers/subCategoryController');

// router.post('/subCategory', subCategoryController.createSubCategory);
// router.put('/subCategory/:id/feature', subCategoryController.changeNewArrivalToFeatured);
// router.get('/subCategory/featured', subCategoryController.getFeaturedSubCategories);
// router.get('/subCategory/new-arrivals', subCategoryController.getNewArrivalSubCategories);

// // New route to get all subcategories
// router.get('/subcategories', subCategoryController.getAllSubCategories);

// module.exports = router;



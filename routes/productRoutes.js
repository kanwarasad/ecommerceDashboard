// /routes/productRoutes
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Ensure the correct path
const upload = require('../middleware/multer'); // Multer configuration
const {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  softDeleteProduct,
  getFeaturedProducts,
  getNewArrivalProducts,
  // productController,

  changeNewArrivalToFeatured

} = require('../controllers/productController');

router.post('/', upload.array('images', 10), verifyToken, verifyAdmin, createProduct);
router.put('/:id',verifyToken,verifyAdmin, upload.array('images', 10), updateProduct);
router.get('/:id', verifyToken, getProduct);
router.get('/', verifyToken, getAllProducts);
router.delete('/:id', verifyToken, verifyAdmin, softDeleteProduct);

router.put('/:id/feature', verifyToken,verifyAdmin,  changeNewArrivalToFeatured);
router.get('/new-arrivals', verifyToken, getNewArrivalProducts);
router.get('/featured', verifyToken, getFeaturedProducts);

module.exports = router;


























// const express = require('express');
// const router = express.Router();
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Ensure the correct path
// const productController = require('../controllers/productController'); // Ensure the correct path

// router.post('/', verifyToken, verifyAdmin, productController.createProduct);
// router.put('/:id/feature', verifyToken,verifyAdmin,  productController.changeNewArrivalToFeatured);
// router.get('/featured', verifyToken, productController.getFeaturedProducts);
// router.get('/new-arrivals', verifyToken, productController.getNewArrivalProducts);
// router.get('/', verifyToken, productController.getAllProducts);
// router.delete('/:id', verifyToken, verifyAdmin, productController.softDeleteProduct);

// module.exports = router;








// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.post('/product', productController.createProduct);
// router.get('/products', productController.getAllProducts);
// router.get('/product/:id', productController.getProductById);
// router.put('/product/:id', productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);

// module.exports = router;
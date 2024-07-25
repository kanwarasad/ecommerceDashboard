const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);
router.delete('/products/:id', productController.softDeleteProduct);

module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.post('/product', productController.createProduct);
// router.get('/products', productController.getAllProducts);
// router.get('/product/:id', productController.getProductById);
// router.put('/product/:id', productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);

// module.exports = router;
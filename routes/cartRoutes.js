const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
// const { authenticate } = require('../middleware/auth');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);

module.exports = router;

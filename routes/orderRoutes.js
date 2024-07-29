const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/orderController');
// const { authenticate } = require('../middleware/auth');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, createOrder);
router.get('/:orderId', verifyToken, getOrder);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// This route is protected. Only logged-in users can create an order.
router.post('/', authMiddleware, createOrder);

module.exports = router;
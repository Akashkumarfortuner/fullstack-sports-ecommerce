const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import our bouncer

// Apply the middleware to this route.
// Any request to this endpoint must first pass the authMiddleware check.
router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
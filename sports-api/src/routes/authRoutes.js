const express = require('express');
const router = express.Router();
// Import both functions from the controller
const { registerUser, loginUser } = require('../controllers/authController');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');

// When a POST request comes to /api/categories/, call the createCategory controller
router.get('/', getAllCategories); // Add this line
router.post('/', createCategory);

module.exports = router;
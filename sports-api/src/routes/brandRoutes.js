const express = require('express');
const router = express.Router();
const { createBrand } = require('../controllers/brandController');

// When a POST request comes to '/', call the createBrand controller function
router.post('/', createBrand);

module.exports = router;
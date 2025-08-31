const express = require('express');
const router = express.Router();
// Import all four functions from the controller
const { 
  createProduct, 
  createProductVariant,
  getAllProducts,
  getProductById
} = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// GET a single product by its ID
router.get('/:productId', getProductById);

// POST a new product
router.post('/', createProduct);

// POST a new variant for a specific product
router.post('/:productId/variants', createProductVariant);

module.exports = router;
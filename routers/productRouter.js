const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a product by query 
router.get('/query', productController.getProducts);

// Get a specific product
router.get('/:id', productController.getProductById);

// Update a product
router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

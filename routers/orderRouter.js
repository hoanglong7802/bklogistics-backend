const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a specific order
router.get('/:id', orderController.getOrderById);

// Update an order
router.put('/:id', orderController.updateOrder);

// Manage order (cancel or confirm)
router.put('/manage/:id', orderController.manageOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

// Get orders by query (suppliers, manufacturers, or address)
router.get('/query', orderController.getOrders);

// Get orders by date
router.get('/date', orderController.getOrdersByDate);

// Get orders by status
router.get('/status', orderController.getOrdersByStatus);

module.exports = router;

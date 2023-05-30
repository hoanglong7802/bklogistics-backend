const express = require('express');
const shipmentController = require('../controllers/shipmentController');

const router = express.Router();

// Create a new shipment
router.post('/', shipmentController.createShipment);

// Get all shipments
router.get('/', shipmentController.getAllShipments);

// Get a shipment by query
router.get('/query', shipmentController.getShipments);

// Get a specific shipment
router.get('/:id', shipmentController.getShipmentById);

// Update a shipment
router.put('/:id', shipmentController.updateShipment);

// Delete a shipment
router.delete('/:id', shipmentController.deleteShipment);

module.exports = router;

const express = require('express');
const materialController = require('../controllers/materialController');

const router = express.Router();

// Create a new material
router.post('/', materialController.createMaterial);

// Get all materials
router.get('/', materialController.getAllMaterials);

// Get a specific material
router.get('/:id', materialController.getMaterialById);

// Update a material
router.put('/:id', materialController.updateMaterial);

// Delete a material
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;

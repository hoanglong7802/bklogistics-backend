const express = require("express");
const requiredMaterialController = require("../controllers/requiredMaterialController");

const router = express.Router();

// Create an order-stakeholder
router.post("/", requiredMaterialController.createRequiredMaterial);

// Get an order-stakeholder by query
router.get("/", requiredMaterialController.getRequiredMaterial);

// Get an order-stakeholder by id
router.get("/:id", requiredMaterialController.getRequiredMaterialById);

// Update an order-stakeholder
router.put("/:id", requiredMaterialController.updateRequiredMaterial);

// Delete an order-stakeholder 
router.delete("/:id", requiredMaterialController.deleteRequiredMaterial);

module.exports = router;
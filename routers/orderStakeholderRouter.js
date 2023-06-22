const express = require("express");
const orderStakeholderController = require("../controllers/orderStakeholderController");

const router = express.Router();

// Create an order-stakeholder
router.post("/", orderStakeholderController.createOrderStakeholder);

// Get an order-stakeholder by query
router.get("/", orderStakeholderController.getOrderStakeholder);

// Get an order-stakeholder by id
router.get("/:id", orderStakeholderController.getOrderStakeholderById);

// Update an order-stakeholder
router.put("/:id", orderStakeholderController.updateOrderStakeholder);

// Delete an order-stakeholder 
router.delete("/:id", orderStakeholderController.deleteOrderStakeholder);

module.exports = router;
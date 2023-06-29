const express = require("express");
const updateController = require("../controllers/updateController");
const { authenticate } = require("../middlewares/_auth.middleware");
const router = express.Router();

// router.post("/", requestController.post);
// router.get("/", authenticate, requestController.get);
router.get("/onchain/:chainId/product", updateController.updateProductOnChain);
router.get(
	"/onchain/:chainId/material",
	updateController.updateMaterialOnChain
);
router.get("/onchain/:chainId/order", updateController.updateOrderOnchain);

// router.put("/update/:id", authenticate, requestController.updateStatus);

module.exports = router;

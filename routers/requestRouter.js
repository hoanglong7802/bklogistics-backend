const express = require("express");
const requestController = require("../controllers/requestController");
const { authenticate } = require("../middlewares/_auth.middleware");
const router = express.Router();

router.post("/", requestController.post);
router.get("/", authenticate, requestController.get);
router.put("/update/:id", authenticate, requestController.updateStatus);

module.exports = router;
